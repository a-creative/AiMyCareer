<?php

namespace App\Http\Controllers;

use App\Entities\JobPosting;
use App\Entities\User;
use LaravelDoctrine\ORM\Facades\EntityManager;
use Illuminate\Http\Request;

class JobPostingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    public function index()
    {
        $postings = EntityManager::createQueryBuilder()
            ->select('jp')
            ->from(JobPosting::class, 'jp')
            ->where('jp.ownerUser = :user')
            ->setParameter('user', auth()->user())
            ->getQuery()
            ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY)
        ;

        return $postings;
    }

    private static function assignFromRequest( Request $request, JobPosting $jobPosting, bool $isInsert = false ) : JobPosting {

        // Update user controlled
        $jobPosting->setJobTitle( $request->jobTitle );
        $jobPosting->setEmployer( $request->input('employer' ) );
        $jobPosting->setExtLink( $request->input('extLink' ) );

        if ( $request->has('postedDate')) {
            $jobPosting->setPostedDate( new \DateTime($request->input('postedDate')));
        } else {
            $jobPosting->setPostedDate( null );
        }

        if ( $request->has('deadlineDate')) {
            $jobPosting->setDeadlineDate( new \DateTime($request->input('deadlineDate')));
        } else {
            $jobPosting->setDeadlineDate( null );
        }

        if ( $request->has('earliestFeedbackDate')) {
            $jobPosting->setEarliestFeedbackDate( new \DateTime($request->input('earliestFeedbackDate')));
        } else {
            $jobPosting->setEarliestFeedbackDate( null );
        }

        if ( $request->has('earliestStartingDate')) {
            $jobPosting->setEarliestStartingDate( new \DateTime($request->input('earliestStartingDate')));
        } else {
            $jobPosting->setEarliestStartingDate( null );
        }

        $jobPosting->setLocationCity( $request->input('locationCity' ) );
        $jobPosting->setLocationPostalCode( $request->input('locationPostalCode' ) );
        $jobPosting->setContactName( $request->input('contactName' ) );
        $jobPosting->setContactJobTitle( $request->input('contactJobTitle' ) );
        $jobPosting->setContactDetails( $request->input('contactDetails' ) );
        $jobPosting->setContentRaw( $request->input('contentRaw' ) );

        $now = new \DateTime();

        // Update system controlled
        if ( $isInsert ) {
            $jobPosting->setCreatedTime( $now );
        }
        $jobPosting->setUpdatedTime( $now );

        return $jobPosting;
    }

    public function insert(Request $request ) {
        $jobPosting = new JobPosting();
        $jobPosting->setOwnerUser( auth()->user() );
        $jobPosting = static::assignFromRequest( $request, $jobPosting, true );
        EntityManager::persist( $jobPosting);
        EntityManager::flush();

        return response()->json( $jobPosting->toArray() );
    }

    public function update(Request $request, int $id) {
        $jobPosting = EntityManager::find( JobPosting::class, $id );

        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var JobPosting $jobPosting */
        if ( $jobPosting->getOwnerUser()->getId() === $authUser->getId() ) {

            $jobPosting = static::assignFromRequest( $request, $jobPosting );
            EntityManager::persist( $jobPosting );
            EntityManager::flush();

            return response()->json( $jobPosting->toArray() );

        }
        
    }

    public function delete(Request $request, int $id) {

        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var JobPosting $jobPosting */
        $jobPosting = EntityManager::find( JobPosting::class, $id );

        if ($jobPosting->getOwnerUser()->getId() === $authUser->getId()) {
            EntityManager::remove($jobPosting);
            EntityManager::flush();
            return $id;
        }
    }
}
