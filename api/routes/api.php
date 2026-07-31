<?php

use Illuminate\Support\Facades\Route;

// Public routes
Route::get("/", function () {
    return response()->json([
        "message" => "Welcome to the Trello API",
    ]);
});

// Private routes
Route::middleware('auth:sanctum')->group(function () {

});