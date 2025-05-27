<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Illuminate\Support\Facades\Hash;

class ReservationStoreAction
{
    public function __invoke(array $data): ReservationResource
    {

        $reservation = Reservation::create([
            'code' => $data['code'],
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
        ]);

        return ReservationResource::fromModel($reservation);
    }
}
