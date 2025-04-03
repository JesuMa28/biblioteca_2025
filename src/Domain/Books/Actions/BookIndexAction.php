<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;

class BookIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $books = Book::query()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
                    ->orWhere('editorial', 'like', "%{$search}%")
                    ->orWhere('language', 'like', "%{$search}%")
                    ->orWhere('isbn', 'like', "%{$search}%")
                    ->orWhere('category_name', 'like', "%{$search}%")
                    ->orWhere('published_year', 'like', "%{$search}%")
                })
            ->latest()
            ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    }
}
