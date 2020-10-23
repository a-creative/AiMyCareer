<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('getAccessToken', [AuthController::class, 'getAccessToken']);
    Route::post('register', [ AuthController::class, 'register'] );
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::get('/job-postings', [ JobPostingController::class, 'index'] );
Route::post('/job-postings', [ JobPostingController::class, 'insert'] );
Route::put('/job-postings/{id}', [ JobPostingController::class, 'update'] );
Route::delete('/job-postings/{id}', [ JobPostingController::class, 'delete'] );

Route::delete('/users/{id}', [ UserController::class, 'delete'] );
