<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrefeituraController;
use App\Http\Controllers\PageController;

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

// --- React Application Routes ---

// Route for the React Homepage.
// IMPORTANT: Ensure the 'index' method in your PrefeituraController returns `view('welcome');`
Route::get('/', [PrefeituraController::class, 'index'])->name('prefeitura.index');

// Route for our custom React Login Page.
// This loads the main 'welcome.blade.php' view, and then React Router takes over to show the LoginPage component.
Route::get('/login', function () {
    return view('welcome');
})->name('login');

// --- Backend and Authentication Routes ---

// Include Laravel's built-in authentication routes (for handling the login POST request, logout, etc.),
// but we explicitly disable the default GET /login route to prevent it from conflicting with our React route above.
Auth::routes(['login' => false]);

// This is the default dashboard route after a user logs in successfully.
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// --- Dynamic Content Route ---

// This route handles dynamically created pages from the database (e.g., from a CMS).
// NOTE: This will act as a catch-all for any URL that hasn't been defined above.
// If you add new pages in React (e.g., /contact), you must define their Laravel route
// above this line and point it to `view('welcome');`
Route::get('/{slug}', [PageController::class, 'show'])->name('page.show');
