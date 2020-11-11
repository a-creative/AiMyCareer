<?php

namespace App\Http\Controllers;

use App\Entities\SkillCategory;
use App\Entities\User;
use LaravelDoctrine\ORM\Facades\EntityManager;
use Illuminate\Http\Request;

class SkillCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
    }

    public function index()
    {
        $skillCategories = EntityManager::createQueryBuilder()
            ->select('sc')
            ->from(SkillCategory::class, 'sc')
            ->where('sc.ownerUser = :user')
            ->orderBy('sc.name')
            ->setParameter('user', auth()->user())
            ->getQuery()
            ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY)
        ;

        return $skillCategories;
    }

    private static function assignFromRequest( Request $request, SkillCategory $skillCategory, bool $isInsert = false ) : SkillCategory {

        // Update user controlled
        $skillCategory->setName( $request->name );
        $skillCategory->setIcon( $request->icon );
        $skillCategory->setForegroundColorHex( $request->foregroundColorHex );
        $skillCategory->setBackgroundColorHex( $request->backgroundColorHex );
        
        $now = new \DateTime();

        // Update system controlled
        if ( $isInsert ) {
            $skillCategory->setCreatedTime( $now );
        }
        $skillCategory->setUpdatedTime( $now );

        return $skillCategory;
    }

    public function insert(Request $request ) {
        $skillCategory = new SkillCategory();
        $skillCategory->setOwnerUser( auth()->user() );
        $skillCategory = static::assignFromRequest( $request, $skillCategory, true );
        EntityManager::persist( $skillCategory);
        EntityManager::flush();

        return response()->json( $skillCategory->toArray() );
    }

    public function update(Request $request, int $id) {
        $skillCategory = EntityManager::find( SkillCategory::class, $id );

        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var SkillCategory $skillCategory */
        if ( $skillCategory->getOwnerUser()->getId() === $authUser->getId() ) {

            $skillCategory = static::assignFromRequest( $request, $skillCategory );
            EntityManager::persist( $skillCategory );
            EntityManager::flush();

            return response()->json( $skillCategory->toArray() );

        }
        
    }

    public function delete(Request $request, int $id) {

        /** @var User $authUser */
        $authUser = auth()->user();

        /** @var SkillCategory $skillCategory */
        $skillCategory = EntityManager::find( SkillCategory::class, $id );

        if ($skillCategory->getOwnerUser()->getId() === $authUser->getId()) {
            EntityManager::remove($skillCategory);
            EntityManager::flush();
            return $id;
        }
    }
}
