<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Shelves\Models\Shelf;
use Domain\Books\Models\Book;

class ShelfSeeder extends Seeder {

    public function run(){

        Shelf::truncate();
        Shelf::factory()->count(9)->create();

    }

}