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
            UserSeeder::class,
            DepartmentSeeder::class,
            MenuItemSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
