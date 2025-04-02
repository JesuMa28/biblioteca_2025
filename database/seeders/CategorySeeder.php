<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Default categories list
        $categories = [
            ['name' => 'Ficción'],
            ['name' => 'No Ficción'],
            ['name' => 'Ciencia'],
            ['name' => 'Historia'],
            ['name' => 'Fantasía'],
            ['name' => 'Terror'],
            ['name' => 'Misterio'],
            ['name' => 'Biografía'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
