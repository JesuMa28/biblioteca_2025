<?php

namespace Domain\Shelves\Data\Resources;

use Domain\Shelves\Models\Shelf;
use Spatie\LaravelData\Data;

class ShelfResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $code,
        public readonly integer $capacity,
        public readonly string $zone_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Shelf $shelf): self
    {
        return new self(
            id: $shelf->id,
            code: $shelf->code,
            capacity: $shelf->capacity,
            zone_id: $shelf->zone_id,
            created_at: $shelf->created_at->format('Y-m-d H:i:s'),
            updated_at: $shelf->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
