<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function show(string $slug)
    {
        $page = Page::where('slug', $slug)->where('is_public', true)->firstOrFail();

        // Renderiza a view baseada no template definido no banco de dados
        return view($page->template, ['page' => $page]);
    }
}
