<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/job_postings', [ JobPostingController::class, 'index'] );
Route::post('/job_postings', [ JobPostingController::class, 'insert'] );
Route::put('/job_postings/{id}', [ JobPostingController::class, 'update'] );
Route::delete('/job_postings/{id}', [ JobPostingController::class, 'delete'] );

