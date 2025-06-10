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
        public readonly string $editorial,
        public readonly string $language,
        public readonly int $published_year,
        public readonly string $isbn,
        public readonly int $pages,
        public readonly string $shelf_id,
        public readonly string $shelf_code,
        public readonly string $zone_name,
        public readonly int $floor_number,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        $shelf = $book->shelf;
        $zone = $shelf->zone;
        $floor = $zone->floor;
        return new self(
            id: $book->id,
            title: $book->title,
            author: $book->author,
            editorial: $book->editorial,
            language: $book->language,
            published_year: $book->published_year,
            isbn: $book->isbn,
            pages: $book->pages,
            shelf_id: $book->shelf_id,
            shelf_code: $shelf->code,
            zone_name: $zone->name,
            floor_number: $floor->number,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
