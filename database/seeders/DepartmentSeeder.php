<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Secretary;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $saude = Secretary::where('name', 'Secretaria de Saúde')->first();
        if ($saude) {
            Department::create(['secretary_id' => $saude->id, 'name' => 'Vigilância Sanitária']);
            Department::create(['secretary_id' => $saude->id, 'name' => 'Atenção Básica']);
        }
    }
}
