<?php

namespace Domain\Shelves\Actions;

use Domain\Shelves\Data\Resources\ShelfResource;
use Domain\Shelves\Models\Shelf;

class ShelfIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $shelves = Shelf::query()
            ->when($search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                ->orWhereHas('categories', function ($query) use ($search) {
                   $query->where('name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage);

        return $shelves->through(fn ($shelf) => ShelfResource::fromModel($shelf));
    }
}
