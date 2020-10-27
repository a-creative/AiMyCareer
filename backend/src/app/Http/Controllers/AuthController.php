<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use LaravelDoctrine\ORM\Facades\EntityManager;
use App\Entities\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function register( Request $request) {

        $request->validate([
            'firstName' => 'required|string|between:2,80',
            'lastName' => 'required|string|between:2,80',
            'email' => 'required|email|string|max:80',
            'password' => 'required|string|confirmed|min:8',
        ]);

        $userExists = EntityManager::getRepository( User::class )->findBy( [ 'email' => $request->email ] );
        if (!$userExists) {
            $user = new User();
            $user->setEmail($request->email);
            $user->setPassword($request->password);
            $user->setFirstName($request->firstName);
            $user->setLastName($request->lastName);
            EntityManager::persist($user);
            EntityManager::flush();

            return response()->json([
                'message' => 'User successfully registered',
                'user' => $user->toArray(),
            ], 201);
        } else {
            return response()->json([
                'error' => 'A user with the email address "{{email}}" already exists',
                'email' => $request->email,
            ], 422);
        }
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login( Request $request)
    {
        $request->validate([
            'email' => 'required|email|between:2,80',
            'password' => 'required|string|between:2,80',
        ]);

        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'errors' => [ 'form' =>[ 'The user does not exist. Please make sure you typed the right information.'] ] ], 401);
        }

        return $this->respondWithUserInfo($token);
        
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithUserInfo(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithUserInfo($token)
    {
        $user = auth()->user()->toArray();

        $user[ 'token'  ] = [
            'key' => $token,
            'type' => 'bearer',
            'expiresIn' => auth()->factory()->getTTL() * 60
        ];

        return response()->json($user); 
    }
}