<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AdminOrderController;

/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

/* =========================
   USER AUTH (LOGIN & REGISTER)
========================= */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/* =========================
   ADMIN AUTH
========================= */
Route::post('/admin/login', [AdminAuthController::class, 'login']);

/* =========================
   PRODUCT (PUBLIC)
========================= */
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

/* =========================
   PROTECTED ROUTES
   (USER & ADMIN - SANCTUM)
========================= */
Route::middleware('auth:sanctum')->group(function () {

    /* =========================
       PRODUCT (ADMIN ONLY)
    ========================= */
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    /* =========================
       CART (USER ONLY)
    ========================= */
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'add']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'delete']);

    /* =========================
       ORDER (USER CHECKOUT)
    ========================= */
    Route::post('/orders', [OrderController::class, 'store']);

    /* =========================
       ADMIN ORDER (STEP 4)
    ========================= */
    Route::get('/admin/orders', [AdminOrderController::class, 'index']);
    Route::get('/admin/orders/{id}', [AdminOrderController::class, 'show']);
    Route::put('/admin/orders/{id}/confirm-dp', [AdminOrderController::class, 'confirmDp']);
    Route::delete('/admin/orders/{id}', [OrderController::class, 'destroy']);

});
