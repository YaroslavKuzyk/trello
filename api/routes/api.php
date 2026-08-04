<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public routes
Route::post("/auth/register", [AuthController::class, "register"]);

// Private routes
Route::middleware('auth:sanctum')->group(function () {

});