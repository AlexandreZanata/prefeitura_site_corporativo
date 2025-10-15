<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Secretary;

class SecretarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Secretary::create(['name' => 'Secretaria de Saúde']);
        Secretary::create(['name' => 'Secretaria de Educação']);
        Secretary::create(['name' => 'Secretaria de Obras e Serviços Públicos']);
    }
}
