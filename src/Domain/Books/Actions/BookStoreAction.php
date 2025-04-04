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
            'editorial' => $data['editorial'],
            'language' => $data['language'],
            'published_year' => $data['published_year'],
            'isbn' => $data['isbn'],
            'pages' => $data['pages'],
            'shelf_id' => $data['shelf_id'],

        ]);

        return BookResource::fromModel($book);
    }
}
