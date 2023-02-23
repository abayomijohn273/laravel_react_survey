<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::view("/hi", "welcome");

Route::get("/{id}", function(string $id) {
    return "Custom View ".$id;
});

Route::get('/user/{name?}', function (string $name = 'John') {
    return $name;
});