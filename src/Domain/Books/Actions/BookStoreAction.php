<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class BookStoreAction
{
    public function __invoke(array $data): BookResource
    {
        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'category_name' => $data['category_name'],
            'shelf_id' => $data['shelf_id'],

        ]);

        return BookResource::fromModel($book);
    }
}
