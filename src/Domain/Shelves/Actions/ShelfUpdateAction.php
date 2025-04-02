<?php

namespace Domain\Shelves\Actions;

use Domain\Shelves\Data\Resources\ShelfResource;
use Domain\Shelves\Models\Shelf;
use Illuminate\Support\Facades\Hash;

class ShelfUpdateAction
{
    public function __invoke(Shelf $shlef, array $data): ShelfResource
    {
        $updateData = [
            'code' => $data['code'],
            'zone' => $data['zone_id'],
            'category' => $data['category_id'],
        ];

        $shelf->update($updateData);

        return ShelfResource::fromModel($shelf->fresh());
    }
}
