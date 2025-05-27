<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;

class ReservationIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $reservations = Reservation::query()
            ->when($search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                    ->orWhere('book_title', 'like', "%{$search}%")
                    ->orWhere('user_email', 'like', "%{$search}%");

                })
            ->latest()
            ->paginate($perPage);

        return $reservations->through(fn ($reservation) => ReservationResource::fromModel($reservation));
    }
}
