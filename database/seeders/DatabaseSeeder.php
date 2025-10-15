<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // Dependências primeiro
            RoleSeeder::class,
            StatusSeeder::class,
            SecretarySeeder::class,
            RoleHierarchySeeder::class,

            // Seeders que dependem dos anteriores
            UserSeeder::class,
            DepartmentSeeder::class,
        ]);
    }
}
