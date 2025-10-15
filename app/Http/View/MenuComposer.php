<?php

namespace App\Http\View\Composers;

use Illuminate\View\View;
use App\Models\MenuItem;

class MenuComposer
{
    /**
     * Bind data to the view.
     *
     * @param  \Illuminate\View\View  $view
     * @return void
     */
    public function compose(View $view)
    {
        // Pega apenas os itens principais (que não têm pai) e já carrega os filhos de cada um
        $menuItems = MenuItem::whereNull('parent_id')
            ->with('children')
            ->orderBy('order')
            ->get();

        $view->with('menuItems', $menuItems);
    }
}
