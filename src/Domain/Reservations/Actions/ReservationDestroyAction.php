<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Models\Reservation;
use Domain\Books\Models\Book;

class ReservationDestroyAction
{
    public function __invoke(Reservation $reservation): void
    {
        $book = Book::find($reservation->book_id);

        if ($book) {
            $book->status = 'Available'; // debe coincidir exactamente con el valor ENUM
            $book->save();
        }

        $reservation->delete();
    }
}
