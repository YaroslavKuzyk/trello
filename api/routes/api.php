<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register'])->middleware(['stateful', 'throttle:5,1']);
Route::post('/auth/login', [AuthController::class, 'login'])->middleware(['stateful', 'throttle:5,1']);

// Private routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('stateful');
});
