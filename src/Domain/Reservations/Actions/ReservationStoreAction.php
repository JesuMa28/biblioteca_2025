<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Illuminate\Support\Facades\Hash;
use App\Notifications\BookReservedNotification;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;



class ReservationStoreAction
{
    public function __invoke(array $data): ReservationResource
    {

        $reservation = Reservation::create([
            'code' => $data['code'],
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
        ]);

        $reservationResource = ReservationResource::fromModel($reservation);

        $user = $reservation->user; // O recupera el usuario como tengas definido
        $user->notify(new BookReservedNotification($reservationResource));


        // Actualizar el estado del libro a 'Loaned'
        $book = Book::find($data['book_id']);
        if ($book) {
            $book->status = 'Reserved'; // debe coincidir exactamente con el valor ENUM
            $book->save();
        }

        return ReservationResource::fromModel($reservation);
    }
}
