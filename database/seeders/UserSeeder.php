<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Status;
use App\Models\Cpf;
use App\Models\Phone;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pega as dependências para associar
        $superAdminRole = Role::where('slug', 'super-admin')->firstOrFail();
        $adminRole = Role::where('slug', 'admin')->firstOrFail();
        $userRole = Role::where('slug', 'user')->firstOrFail();
        $activeStatus = Status::where('slug', 'active')->firstOrFail();

        // Usuário 1: Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $superAdminRole->id,
            'status_id' => $activeStatus->id,
        ]);
        Cpf::create(['user_id' => $superAdmin->id, 'number' => '11122233344']);
        Phone::create(['user_id' => $superAdmin->id, 'number' => '66999998888']);

        // Usuário 2: Admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
            'status_id' => $activeStatus->id,
        ]);
        Cpf::create(['user_id' => $admin->id, 'number' => '22233344455']);

        // Usuário 3: User
        User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
            'status_id' => $activeStatus->id,
        ]);
    }
}
