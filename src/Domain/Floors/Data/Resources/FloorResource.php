<?php

namespace Domain\Floors\Data\Resources;

use Domain\Floors\Models\Floor;
use Spatie\LaravelData\Data;

class FloorResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $number,
        public readonly int $capacity,
        public readonly int $floors_count,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Floor $floor): self
    {
        return new self(
            id: $floor->id,
            number: $floor->number,
            capacity: $floor->capacity,
            floors_count: $floor->zones()->count(),
            created_at: $floor->created_at->format('Y-m-d H:i:s'),
            updated_at: $floor->updated_at->format('Y-m-d H:i:s'),
        );
    }
}