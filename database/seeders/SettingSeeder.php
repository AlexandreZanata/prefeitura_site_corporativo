<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        // Cria ou atualiza o nome do site
        Setting::updateOrCreate(
            ['key' => 'site_name'],
            ['value' => 'Portal da Prefeitura de Sorriso']
        );

        // Cria ou atualiza o caminho da logo do site
        Setting::updateOrCreate(
            ['key' => 'site_logo'],
            ['value' => '/images/logo_prefeitura.png'] // Caminho de exemplo para a logo
        );
    }
}
