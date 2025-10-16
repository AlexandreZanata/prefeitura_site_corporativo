<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrefeituraController;
use App\Http\Controllers\PageController;

// =========================================================================
// REACT APPLICATION ROUTES
// =========================================================================

/**
 * React Homepage Route
 * IMPORTANT: Ensure the 'index' method in PrefeituraController returns view('welcome')
 */
Route::get('/', [PrefeituraController::class, 'index'])->name('prefeitura.index');

/**
 * React Login Page Route
 * Loads the main 'welcome' view, then React Router handles the LoginPage component
 */
Route::get('/login', function () {
    return view('welcome');
})->name('login');

/**
 * React Contact Page Route
 * Public route for contact page handled by React
 */
Route::get('/contato', function () {
    return view('welcome');
})->name('contact');

// =========================================================================
// AUTHENTICATION ROUTES
// =========================================================================

/**
 * Laravel Authentication Routes
 * Includes built-in auth routes but disables GET /login to avoid conflict with React route
 */
Auth::routes(['login' => false]);

/**
 * Dashboard Route
 * Default route after successful user login
 */
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// =========================================================================
// DYNAMIC CONTENT ROUTES
// =========================================================================

/**
 * Dynamic Page Route
 * Handles dynamically created pages from database (CMS functionality)
 *
 * IMPORTANT: This acts as a catch-all for undefined URLs
 * When adding new React pages, define their Laravel routes above this line
 * and point them to view('welcome')
 */
Route::get('/{slug}', [PageController::class, 'show'])->name('page.show');
