<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\RoleHierarchy;

class RoleHierarchySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::all()->keyBy('slug');

        RoleHierarchy::create(['role_id' => $roles['super-admin']->id, 'level' => 1]);
        RoleHierarchy::create(['role_id' => $roles['admin']->id, 'level' => 2]);
        RoleHierarchy::create(['role_id' => $roles['editor']->id, 'level' => 3]);
        RoleHierarchy::create(['role_id' => $roles['user']->id, 'level' => 4]);
    }
}
