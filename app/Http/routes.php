<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/



/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/


Route::group(['middleware' => 'web'], function () {

    Route::get('/', function () {
        return view('welcome');
    });

    // Generates the routes for your authentication
    Route::auth();

    // Automatically generated
    Route::get('/home', 'HomeController@index');

    // This will put "api/" before every route inside of the group. We do this because our routes are actually part of our
    // backend API, not part of how the user will interact with the page on the frontend. We want a user to be able to visit
    // /subbreddit and have it pull in views etc, not just be our API calls.
    Route::group(['prefix' => 'api'], function() {

        // index() and show() can be seen without being logged in
        Route::resource('subbreddits', 'SubbredditsController', [
            'only' => ['index', 'show']
        ]);

        Route::resource('users', 'UsersController', [
            'only' => ['index', 'show']
        ]);

        Route::resource('posts', 'PostsController', [
            'only' => ['index', 'show']
        ]);

        Route::resource('comments', 'CommentsController', [
            'only' => ['index', 'show']
        ]);

        // These are the routes that can only be accessed once you are logged in
        Route::group(['middleware' => 'auth'], function () {

            Route::resource('subbreddits', 'SubbredditsController', [
                'only' => ['store', 'update', 'destroy']
            ]);

            Route::resource('users', 'UsersController', [
                'only' => ['store', 'update', 'destroy']
            ]);

            Route::resource('posts', 'PostsController', [
                'only' => ['store', 'update', 'destroy']
            ]);

            Route::resource('comments', 'CommentsController', [
                'only' => ['store', 'update', 'destroy']
            ]);

        });
    });
});