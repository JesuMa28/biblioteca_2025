<?php

namespace Domain\Zones\Data\Resources;

use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class ZoneResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly integer $capacity,
        public readonly string $floor_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Zone $zone): self
    {
        return new self(
            id: $zone->id,
            name: $zone->name,
            capacity: $zone->capacity,
            floor_id: $zone->floor_id,
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
