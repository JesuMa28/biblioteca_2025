<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;

class ZoneIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $zones = Zone::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('category_id', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage);

        return $users->through(fn ($user) => UserResource::fromModel($user));
    }
}
