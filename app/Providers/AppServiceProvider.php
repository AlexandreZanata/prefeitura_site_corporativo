<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Schema;
use App\Models\MenuItem;
use App\Models\Setting;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Compartilha variáveis globais com todas as views ('*')
        View::composer('*', function ($view) {
            // Lógica para carregar os itens do menu
            if (Schema::hasTable('menu_items')) {
                $menuItems = MenuItem::whereNull('parent_id')
                    ->with('children')
                    ->orderBy('order')
                    ->get();
                $view->with('menuItems', $menuItems);
            } else {
                $view->with('menuItems', collect());
            }

            // Lógica para carregar o nome do site
            if (Schema::hasTable('settings')) {
                // Tenta buscar o nome do site; se não encontrar, usa o valor do config
                $siteNameSetting = Setting::where('key', 'site_name')->first();
                $siteName = $siteNameSetting ? $siteNameSetting->value : config('app.name', 'Portal da Prefeitura');
                $view->with('siteName', $siteName);
            } else {
                // Se a tabela de configurações não existe, usa o valor do config
                $view->with('siteName', config('app.name', 'Portal da Prefeitura'));
            }
        });
    }
}
