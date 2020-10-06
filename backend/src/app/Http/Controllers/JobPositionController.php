<?php

namespace App\Http\Controllers;

use App\Entities\JobPosition;
use LaravelDoctrine\ORM\Facades\EntityManager;

class JobPositionController extends Controller
{

    public function index() {

        return EntityManager::createQueryBuilder()
            ->select('jp')
            ->from( JobPosition::class, 'jp')
            ->getQuery()
            ->getResult(\Doctrine\ORM\AbstractQuery::HYDRATE_ARRAY);

    }

}
