<?php

namespace Domain\Zones\Data\Resources;

use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;
use Domain\Categories\Models\Category;
use Spatie\LaravelData\Data;

class ZoneResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly int $capacity,
        public readonly string $floor_id,
        public readonly int $floor_number,
        public readonly string $category_id,
        public readonly string $category_name,
        public readonly int $zones_count,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Zone $zone): self
    {
        $floor = Floor::where('id', $zone->floor_id)-> first();
        $category = Category::where('id', $zone->category_id)-> first();
        return new self(
            id: $zone->id,
            name: $zone->name,
            capacity: $zone->capacity,
            floor_id: $zone->floor_id,
            floor_number: $floor->number,
            category_id: $zone->category_id,
            category_name: $category->name,
            zones_count: $zone->shelves()->count(),
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
