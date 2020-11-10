<?php

namespace App\Http\Controllers;

use App\Entities\Skill;
use App\Entities\User;
use LaravelDoctrine\ORM\Facades\EntityManager;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    public function index()
    {
        $skills = EntityManager::createQueryBuilder()
            ->select('s')
            ->from(Skill::class, 's')
            ->where('s.ownerUser = :user')
            ->orderBy('s.name')
            ->setParameter('user', auth()->user())
            ->getQuery()
            ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY)
        ;

        return $skills;
    }

    private static function assignFromRequest( Request $request, Skill $skill, bool $isInsert = false ) : Skill {

        // Update user controlled
        $skill->setName( $request->name );
        
        $now = new \DateTime();

        // Update system controlled
        if ( $isInsert ) {
            $skill->setCreatedTime( $now );
        }
        $skill->setUpdatedTime( $now );

        return $skill;
    }

    public function insert(Request $request ) {
        $skill = new Skill();
        $skill->setOwnerUser( auth()->user() );
        $skill = static::assignFromRequest( $request, $skill, true );
        EntityManager::persist( $skill);
        EntityManager::flush();

        return response()->json( $skill->toArray() );
    }

    public function update(Request $request, int $id) {
        $skill = EntityManager::find( Skill::class, $id );

        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var Skill $skill */
        if ( $skill->getOwnerUser()->getId() === $authUser->getId() ) {

            $skill = static::assignFromRequest( $request, $skill );
            EntityManager::persist( $skill );
            EntityManager::flush();

            return response()->json( $skill->toArray() );

        }
        
    }

    public function delete(Request $request, int $id) {

        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var Skill $skill */
        $skill = EntityManager::find( Skill::class, $id );

        if ($skill->getOwnerUser()->getId() === $authUser->getId()) {
            EntityManager::remove($skill);
            EntityManager::flush();
            return $id;
        }
    }
}
