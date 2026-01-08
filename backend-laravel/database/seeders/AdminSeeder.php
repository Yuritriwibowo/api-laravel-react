<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::create([
            "name" => "Administrator",
            "email" => "admin@gmail.com",
            "password" => bcrypt("admin123")
        ]);
    }
}
