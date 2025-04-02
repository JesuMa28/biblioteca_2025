<?php

namespace Domain\Books\Data\Resources;

use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $author,
        public readonly string $category_name,
        public readonly string $shelf_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        return new self(
            id: $book->id,
            title: $book->title,
            author: $book->author,
            category_id: $book->category_name,
            shelf_id: $book->shelf_id,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
