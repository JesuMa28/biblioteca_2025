<?php

namespace Domain\Reservations\Data\Resources;

use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;

class ReservationResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $code,
        public readonly string $book_id,
        public readonly string $book_title,
        public readonly string $user_id,
        public readonly string $user_email,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Reservation $reservation): self
    {
        $book = Book::where('id', $reservation->book_id)->first();
        $user = User::where('id', $reservation->user_id)->first();
        return new self(
            id: $reservation->id,
            code: $reservation->code,
            book_id: $reservation->book_id,
            book_title: $book->title,
            user_id: $reservation->user_id,
            user_email: $user->email,
            created_at: $reservation->created_at->format('Y-m-d H:i:s'),
            updated_at: $reservation->updated_at->format('Y-m-d H:i:s'),
        );

    }
}
