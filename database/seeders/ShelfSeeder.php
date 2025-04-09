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
        Shelf::factory()->count(10)->create();

    }

}