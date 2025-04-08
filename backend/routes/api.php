<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmployeeController;


// rate limiting - 60 requests per minute to prevent excessive requests to the API.
Route::middleware('throttle:60,1')->group(function () {
    Route::apiResource('employees', EmployeeController::class);
});
