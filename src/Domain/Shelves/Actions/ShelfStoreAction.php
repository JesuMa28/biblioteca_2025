<?php

namespace Domain\Shelves\Actions;

use Domain\Shelves\Data\Resources\ShelfResource;
use Domain\Shelves\Models\Shelf;
use Illuminate\Support\Facades\Hash;

class ShelfStoreAction
{
    public function __invoke(array $data): ShelfResource
    {
        $shelf = Shelf::create([
            'code' => $data['code'],
            'capacity' => $data['capacity'],
            'zone_id' => $data['zone_id'],
            'category_id' => $data['category_id'],
        ]);

        return ShelfResource::fromModel($shelf);
    }
}
