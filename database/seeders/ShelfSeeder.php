<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Shelves\Models\Shelf;
use Domain\Categories\Models\Category;
use Domain\Books\Models\Book;
use Domain\Zones\Models\Zone;

class ShelfSeeder extends Seeder {

    public function run(){

        Shelf::truncate();
        Shelf::factory()->count(8)->create()->each(function ($shelf) {
            $shelf->categories()->attach(
                Category::inRandomOrder()->take(rand(1, 2))->pluck('id')
            );
        });

    }

}