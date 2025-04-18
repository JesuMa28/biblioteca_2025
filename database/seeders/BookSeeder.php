<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Books\Models\Book;
use Domain\Categories\Models\Category;
use Domain\Shelves\Models\Shelf;

class BookSeeder extends Seeder {

    public function run(){

        Book::truncate();
        Book::factory()->count(10)->create();

    }

}