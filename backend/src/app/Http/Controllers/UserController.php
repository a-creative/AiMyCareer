<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Entities\User;
use LaravelDoctrine\ORM\Facades\EntityManager;

class UserController extends Controller
{
    

    public function delete() {

        $user = EntityManager::find( User::class, request('id'));
        EntityManager::remove( $user );
        EntityManager::flush();

        return response()->json([
            'message' => 'User successfully deleted',
            'id' => request('id')
        ], 201);

    }

}