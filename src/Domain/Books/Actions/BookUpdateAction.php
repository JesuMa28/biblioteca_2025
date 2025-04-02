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
            'category_name' => $data['category_name'],
            'shelf_id' => $data['shelf_id'],
        ];

        $book->update($updateData);

        return BookResource::fromModel($book->fresh());
    }
}
