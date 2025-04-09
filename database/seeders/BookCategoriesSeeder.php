<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Books;
use Domain\Books\Models\Book;
use Domain\Categories\Models\Category;

class BookCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = Book::all();
        $categories = Category::all();

        foreach ($books as $book) {
            $randomCategories = $categories->random(rand(1, 3));

            $book->categories()->sync($randomCategories->pluck('id')->toArray());
        }


    }
}
