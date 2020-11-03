<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobExperienceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobPostingController;
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
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [ AuthController::class, 'register'] );
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);

    Route::get('job-postings', [ JobPostingController::class, 'index'] );
    Route::post('/job-postings', [ JobPostingController::class, 'insert'] );
    Route::put('/job-postings/{id}', [ JobPostingController::class, 'update'] );
    Route::delete('/job-postings/{id}', [ JobPostingController::class, 'delete'] );

    Route::get('job-experiences/{id}', [ JobExperienceController::class, 'get'] );
    Route::get('job-experiences', [ JobExperienceController::class, 'index'] );
    Route::post('/job-experiences', [ JobExperienceController::class, 'insert'] );
    Route::put('/job-experiences/{id}', [ JobExperienceController::class, 'update'] );
    Route::delete('/job-experiences/{id}', [ JobExperienceController::class, 'delete'] );
});


