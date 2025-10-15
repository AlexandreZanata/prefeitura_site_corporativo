<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrefeituraController;
use App\Http\Controllers\PageController;


Route::get('/', [PrefeituraController::class, 'index'])->name('prefeitura.index');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/{slug}', [PageController::class, 'show'])->name('page.show');
