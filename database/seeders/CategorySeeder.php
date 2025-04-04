<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Domain\Categories\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {



        $categories = [
            __('ui.categories.fiction'),
            __('ui.categories.non_fiction'),
            __('ui.categories.science'),
            __('ui.categories.history'),
            __('ui.categories.fantasy'),
            __('ui.categories.horror'),
            __('ui.categories.mystery'),
            __('ui.categories.biography'),
            __('ui.categories.romantic'),
            __('ui.categories.adventure'),
        ];

        foreach ($categories as $name) {
            Category::create(['name' => $name]);
        }
    }
}
