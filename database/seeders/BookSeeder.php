<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Books\Models\Book;
use Domain\Categories\Models\Category;
use Domain\Shelves\Models\Shelf;

class BookSeeder extends Seeder {

    public function run(){

        Book::truncate();
        Book::factory()->count(9)->create()->each(function ($book) {
            $book->categories()->attach(
                Category::inRandomOrder()->take(rand(1, 3))->pluck('id')
            );
        });

    }

}