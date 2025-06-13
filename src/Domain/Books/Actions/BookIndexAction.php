<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;

class BookIndexAction
{
    public function __invoke(?string $search = null, ?string $title = null, ?string $author = null, ?string $status = null, int $perPage = 10)
    {
        $books = Book::query()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
                    ->orWhere('editorial', 'like', "%{$search}%")
                    ->orWhere('language', 'like', "%{$search}%")
                    ->orWhere('isbn', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhere('published_year', 'like', "%{$search}%")
                    ->orWhereHas('categories', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    });

            })
            ->when($title, function ($query, $title) {
                $query->where('title', 'like', "%{$title}%");
            })
            ->when($author, function ($query, $author) {
                $query->where('author', 'like', "%{$author}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('status', 'like', "%{$status}%");
            })
            ->latest()
            ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    }
}
