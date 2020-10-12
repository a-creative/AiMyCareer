<?php

namespace App\Http\Controllers;

use App\Entities\JobPosting;
use LaravelDoctrine\ORM\Facades\EntityManager;

class JobPostingController extends Controller
{

    public function index() {

        $result = EntityManager::createQueryBuilder()
            ->select('jp')
            ->from( JobPosting::class, 'jp')
            ->getQuery()
            ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY);

        $result = [
            'posting' => [ 'postings' => $result ]
        ];

        return $result;
    }

}
