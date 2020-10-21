<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Entities\User;
use LaravelDoctrine\ORM\Facades\EntityManager;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function auth(Request $request) {
        $user = EntityManager::getRepository(self::class)->findBy([
            'username' => $request->input('username')
        ]);

        if ( 
                ( $user instanceof User ) 
            &&  ( $user->auth( $request->input('password')))
        ) {
            return $user->toArray();
        } 

        return null;
        
    }
 
    public function register(Request $request) {

        $user = new User();
        $user->setUsername( $request->input('username'));
        $user->setPassword(  $request->input('password'));
        $user->setFirstName( $request->input('firstName'));
        $user->setLastName( $request->input('lastName'));
        EntityManager::persist( $user );
        EntityManager::flush();

        return $user->toArray();

    }

    public function delete(Request $request ) {
        $user = EntityManager::find( self::class, $request->input('id'));
        EntityManager::remove( $user );
        EntityManager::flush();
        return $request->input('id');
    }

}