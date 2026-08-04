<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public routes
Route::post("/auth/register", [AuthController::class, "register"])->middleware('throttle:5,1');
Route::post("/auth/login", [AuthController::class, "login"])->middleware('throttle:5,1');

// Private routes
Route::middleware('auth:sanctum')->group(function () {

});