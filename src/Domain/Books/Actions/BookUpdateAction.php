<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data): BookResource
    {
        $updateData = [
            'title' => $data['title'],
            'author' => $data['author'],
            'editorial' => $data['editorial'],
            'language' => $data['language'],
            'category_name' => $data['category_name'],
            'published_year' => $data['published_year'],
            'isbn' => $data['isbn'],
            'pages' => $data['pages'],
            'shelf_id' => $data['shelf_id'],
        ];

        $book->update($updateData);

        return BookResource::fromModel($book->fresh());
    }
}
