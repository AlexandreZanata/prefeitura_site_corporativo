<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        Status::create(['name' => 'Active', 'slug' => 'active']);
        Status::create(['name' => 'Inactive', 'slug' => 'inactive']);
        Status::create(['name' => 'Banned', 'slug' => 'banned']);
    }
}
