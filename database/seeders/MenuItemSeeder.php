<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuItem;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        // Limpa a tabela antes de popular
        MenuItem::query()->delete();

        // --- Item de Menu Principal: Secretarias ---
        $secretarias = MenuItem::create(['name' => 'Secretarias', 'url' => '#', 'order' => 1]);

        // Sub-itens de Secretarias
        MenuItem::create(['parent_id' => $secretarias->id, 'name' => 'Saúde', 'url' => '/secretaria/saude', 'category' => 'Administração Direta', 'order' => 1]);
        MenuItem::create(['parent_id' => $secretarias->id, 'name' => 'Educação', 'url' => '/secretaria/educacao', 'category' => 'Administração Direta', 'order' => 2]);
        MenuItem::create(['parent_id' => $secretarias->id, 'name' => 'Obras', 'url' => '/secretaria/obras', 'category' => 'Administração Direta', 'order' => 3]);
        MenuItem::create(['parent_id' => $secretarias->id, 'name' => 'Previ-Sorriso', 'url' => '/secretaria/previ', 'category' => 'Administração Indireta', 'order' => 4]);

        // --- Item de Menu Principal: Serviços ---
        $servicos = MenuItem::create(['name' => 'Serviços', 'url' => '#', 'order' => 2]);

        // Sub-itens de Serviços
        MenuItem::create(['parent_id' => $servicos->id, 'name' => 'Emitir IPTU', 'url' => '/servicos/iptu', 'category' => 'Cidadão', 'order' => 1]);
        MenuItem::create(['parent_id' => $servicos->id, 'name' => 'Nota Fiscal Eletrônica', 'url' => '/servicos/nfe', 'category' => 'Empresa', 'order' => 2]);

        // --- Item de Menu Principal: Contato (link direto) ---
        MenuItem::create(['name' => 'Contato', 'url' => '/contato', 'order' => 3]);
    }
}
