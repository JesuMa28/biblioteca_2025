<?php

namespace Domain\Shelves\Data\Resources;

use Domain\Shelves\Models\Shelf;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;
use Domain\Categories\Models\Category;
use Spatie\LaravelData\Data;

class ShelfResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $code,
        public readonly int $capacity,
        public readonly string $zone_id,
        public readonly string $zone_name,
        public readonly string $category_id,
        public readonly string $category_name,
        public readonly int $shelves_count,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Shelf $shelf): self
    {
        $zone = Zone::where('id', $shelf->zone_id)-> first();
        $category = Category::where('id', $shelf->category_id)-> first();

        return new self(
            id: $shelf->id,
            code: $shelf->code,
            capacity: $shelf->capacity,
            zone_id: $shelf->zone_id,
            zone_name: $zone->name,
            category_id: $shelf->category_id,
            category_name: $category->name,
            shelves_count: $shelf->books()->count(),
            created_at: $shelf->created_at->format('Y-m-d H:i:s'),
            updated_at: $shelf->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
