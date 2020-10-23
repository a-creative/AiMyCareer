<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use LaravelDoctrine\ORM\Facades\EntityManager;
use App\Entities\User;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['getAccessToken','register']]);
    }

    public function register() {

        $user = new User();
        $user->setUsername( request('username'));
        $user->setPassword(  request('password'));
        $user->setFirstName( request('firstName'));
        $user->setLastName( request('lastName'));
        EntityManager::persist( $user );
        EntityManager::flush();

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user->toArray()
        ], 201);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAccessToken()
    {
        $credentials = request(['username', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
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
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }
}