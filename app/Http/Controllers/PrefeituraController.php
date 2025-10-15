<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrefeituraController extends Controller
{
    /**
     * Mostra a página inicial pública da prefeitura.
     */
    public function index()
    {
        return view('prefeitura');
    }
}
