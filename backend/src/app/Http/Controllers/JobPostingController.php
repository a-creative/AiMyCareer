<?php

namespace App\Http\Controllers;

use App\Entities\JobPosting;
use LaravelDoctrine\ORM\Facades\EntityManager;
use Illuminate\Http\Request;

class JobPostingController extends Controller
{
    public function index()
    {
        $result = EntityManager::createQueryBuilder()
            ->select('jp')
            ->from(JobPosting::class, 'jp')
            ->getQuery()
            ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY)
        ;

        return [
            'posting' => ['postings' => $result],
        ];
    }

    private static function assignFromRequest( Request $request, JobPosting $job_posting, bool $is_insert = false ) : JobPosting {

        // Update user controlled
        $job_posting->setJobTitle( $request->job_title );
        $job_posting->setEmployer( $request->input('employer' ) );
        $job_posting->setExtLink( $request->input('ext_link' ) );

        if ( $request->has('posted_date')) {
            $job_posting->setPostedDate( new \DateTime($request->input('posted_date')));
        } else {
            $job_posting->setPostedDate( null );
        }

        if ( $request->has('deadline_date')) {
            $job_posting->setDeadlineDate( new \DateTime($request->input('deadline_date')));
        } else {
            $job_posting->setDeadlineDate( null );
        }

        $job_posting->setLocationCity( $request->input('location_city' ) );
        $job_posting->setLocationPostalCode( $request->input('location_postal_code' ) );
        $job_posting->setContactName( $request->input('contact_name' ) );
        $job_posting->setContactJobTitle( $request->input('contact_job_title' ) );
        $job_posting->setContactDetails( $request->input('contact_details' ) );
        $job_posting->setContentRaw( $request->input('content_raw' ) );

        $now = new \DateTime();

        // Update system controlled
        if ( $is_insert ) {
            $job_posting->setCreatedTime( $now );
        }
        $job_posting->setUpdatedTime( $now );

        return $job_posting;
    }

    public function insert(Request $request ) {
        $job_posting = new JobPosting();
        $job_posting = static::assignFromRequest( $request, $job_posting, true );
        EntityManager::persist( $job_posting);
        EntityManager::flush();

        return response()->json([
            "posting" => $request->all()
        ]);
    }

    public function update(Request $request, int $id) {
        $job_posting = EntityManager::find( JobPosting::class, $id );
        $job_posting = static::assignFromRequest( $request, $job_posting );
        EntityManager::persist( $job_posting );
        EntityManager::flush();

        return response()->json([
            "posting" => $request->all(),
        ]);
    }

    public function delete(Request $request, int $id) {
        $job_posting = EntityManager::find( JobPosting::class, $id );
        EntityManager::remove( $job_posting );
        EntityManager::flush();
        return true;
    }
}
