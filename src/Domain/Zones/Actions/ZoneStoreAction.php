<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Hash;

class ZoneStoreAction
{
    public function __invoke(array $data): ZoneResource
    {
        $zone = Zone::create([
            'name' => $data['name'],
            'floor' => $data['floor_id'],
            'category' => $data['category_id'],
        ]);

        $user->syncPermissions($data['permisos']);

        return UserResource::fromModel($user);
    }
}
