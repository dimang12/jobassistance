<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return inertia('Home');
});

Route::inertia('/about', 'About/About');

// create profile api routes
Route::resource('profiles', ProfileController::class);
