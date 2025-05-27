<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Illuminate\Support\Facades\Hash;

class ReservationUpdateAction
{
    public function __invoke(Reservation $reservation, array $data): ReservationResource
    {
        $updateData = [
            'code' => $data['code'],
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
        ];

        $reservation->update($updateData);

        return ReservationResource::fromModel($reservation->fresh());
    }
}
