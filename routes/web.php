<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrefeituraController;

Route::get('/', [PrefeituraController::class, 'index'])->name('prefeitura.index');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
