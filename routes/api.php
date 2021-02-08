<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//user routes
Route::get('/users/{id}/posts', [UserController::class, 'userPosts']);
Route::resource('users', UserController::class);

//post routes
Route::get('/posts/{id}/comments', [PostController::class, 'postComments']);
Route::resource('posts', PostController::class);

//login routes
Route::post('auth/login',[\App\Http\Controllers\Auth\AuthAPIController::class,'login']);
Route::post('auth/register',[\App\Http\Controllers\Auth\AuthAPIController::class,'register']);
Route::get('auth/logout',[\App\Http\Controllers\Auth\AuthAPIController::class,'logout']);
