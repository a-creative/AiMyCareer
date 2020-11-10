<?php

namespace App\Http\Controllers;

use App\Entities\JobExperience;
use App\Entities\User;
use App\Entities\Task;
use App\Entities\TaskExpSkill;
use App\Entities\Skill;
use LaravelDoctrine\ORM\Facades\EntityManager;
use Illuminate\Http\Request;

class JobExperienceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    public function get(Request $request, int $id) {

        $jobExperience = EntityManager::find( JobExperience::class, $id );
        
        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var JobExperience $jobExperience */
        if ($jobExperience->getOwnerUser()->getId() === $authUser->getId()) {

            $tasks = $jobExperience->getPerformedTasks();
            $tasks_a = [];
            foreach ( $tasks as $task ) {
                $task_a = $task->toArray();

                $task_a['usedSkills'] = [];

                $taskExpSkills = EntityManager::getRepository( TaskExpSkill::class)->findBy([ 'usedWithTask' => $task ]);
                foreach ( $taskExpSkills as $taskExpSkill ) {

                    /** @var Skill $skill */
                    $skill = $taskExpSkill->getUsedSkill();

                    $task_a['usedSkills'][] = [
                        'id' => $skill->getId(),
                        'name' => $skill->getName(),
                        'usageWeightPct' => $taskExpSkill->getUsageWeightPct()
                    ];
                }

                $tasks_a[] = $task_a;
            }

            return response()->json([
                'id' => $jobExperience->getId(),
                'tasks' => $tasks_a
            ]);
        
        }

    }

    public function index()
    {
        $jobExperiences = EntityManager::createQueryBuilder()
            ->select('je')
            ->from(JobExperience::class, 'je')
            ->where('je.ownerUser = :user')
            ->setParameter('user', auth()->user())
            ->getQuery()
            ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY)
        ;

        return $jobExperiences;
    }

    private static function assignFromRequest( Request $request, JobExperience $jobExperience, bool $isInsert = false ) : JobExperience {

        // Update user controlled
        $jobExperience->setJobTitle( $request->jobTitle );
        $jobExperience->setEmployer( $request->input('employer' ) );

        if ( $request->has('startedDate')) {
            $jobExperience->setStartedDate( new \DateTime($request->input('startedDate')));
        } else {
            $jobExperience->setStartedDate( null );
        }

        if ( $request->has('endedDate')) {
            $jobExperience->setEndedDate( new \DateTime($request->input('endedDate')));
        } else {
            $jobExperience->setEndedDate( null );
        }

        $requestTasks = json_decode( $request->tasks );

        if ( !$isInsert ) {

            // On update

            // Detect all saved entities that exists in the saved entities, but not in the request
            $removeTasks = [];
            $requestTaskIds = array_map( function( $requestTask ) { return ( property_exists( $requestTask, 'id') ? $requestTask->id : -1); }, $requestTasks );
            foreach( $jobExperience->getPerformedTasks() as $task ) {
                if (!in_array($task->getId(), $requestTaskIds)) {
                    $removeTasks[] = $task;
                } 
            }

            // Delete the saved entities and remove from collection
            foreach( $removeTasks as $removeTask) {
                $jobExperience->removeTask( $removeTask );
                EntityManager::remove( $removeTask );
            }
        }
        
        // On insert and update
        
        // Loop all the entities in the request
        
        foreach ($requestTasks as $requestTask) {

            /** @var Task $task */
            if ( property_exists( $requestTask, 'id') ) {
                $task = EntityManager::find( Task::class, $requestTask->id );
            } else {
                $task = new Task();
            }

            $task->setWeightPct( $requestTask->weightPct );
            $task->setDescription( $requestTask->description );
            $jobExperience->addTask( $task );
            EntityManager::persist( $task );
            
            $requestSkills = $requestTask->skills;

            // Loop all current skill entities connected to task and remove those not in the request
            
            $taskExpSkills = EntityManager::getRepository( TaskExpSkill::class)->findBy([ 'usedWithTask' => $task ]);
            $requestSkillIds = array_map( function( $requestSkill ) { return $requestSkill->id; }, $requestSkills );
            $removeSkills = [];
            /** @var TaskExpSkill $taskExpSkill */
            foreach ( $taskExpSkills as $taskExpSkill ) {
                $skill = $taskExpSkill->getUsedSkill();

                if (!in_array($skill->getId(), $requestSkillIds)) {
                    $removeSkills[] = $skill;
                } 
            }

            foreach( $removeSkills as $removeSkill) {

                /** @var TaskExpSkill $taskExpSkill */
                $taskExpSkill = EntityManager::getRepository( TaskExpSkill::class )->findOneBy(
                    [ 'usedWithTask' => $task, 'usedSkill' => $removeSkill ]);

                EntityManager::remove( $taskExpSkill );
            }

            // Loop all skills connected to task in request. Add relation if not present.
            
            foreach ( $requestSkills as $requestSkill) {
                
                $skill = EntityManager::find( Skill::class, $requestSkill->id );

                /** @var TaskExpSkill $taskExpSkill */
                $taskExpSkill = EntityManager::getRepository( TaskExpSkill::class )->findOneBy(
                    [ 'usedWithTask' => $task, 'usedSkill' => $skill ]);

                if (!$taskExpSkill){
                    $taskExpSkill = new TaskExpSkill();
                    $taskExpSkill->setUsedSkill( $skill );
                    $taskExpSkill->setUsedWithTask( $task );
                }

                $taskExpSkill->setUsageWeightPct( $requestSkill->usageWeightPct );
                EntityManager::persist( $taskExpSkill );

            }

        }

        // Update system controlled
        $now = new \DateTime();
        if ( $isInsert ) {
            $jobExperience->setCreatedTime( $now );
        }
        $jobExperience->setUpdatedTime( $now );

        return $jobExperience;
    }

    public function insert(Request $request ) {
        $jobExperience = new JobExperience();
        $jobExperience->setOwnerUser( auth()->user() );
        $jobExperience = static::assignFromRequest( $request, $jobExperience, true );
        EntityManager::persist( $jobExperience);
        EntityManager::flush();

        return response()->json($jobExperience->toArray());
    }

    public function update(Request $request, int $id) {

        $jobExperience = EntityManager::find( JobExperience::class, $id );

        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var JobExperience $jobExperience */
        if ( $jobExperience->getOwnerUser()->getId() === $authUser->getId() ) {

            $jobExperience = static::assignFromRequest( $request, $jobExperience );
            EntityManager::persist( $jobExperience );
            EntityManager::flush();

            return response()->json($jobExperience->toArray());

        }
        
    }

    public function delete(Request $request, int $id) {

        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var JobExperience $jobExperience */
        $jobExperience = EntityManager::find( JobExperience::class, $id );

        if ($jobExperience->getOwnerUser()->getId() === $authUser->getId()) {
            EntityManager::remove($jobExperience);
            EntityManager::flush();
            return $id;
        }
    }
}
