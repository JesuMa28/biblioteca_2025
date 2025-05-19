<?php

namespace Domain\Loans\Data\Resources;

use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $book_id,
        public readonly string $book_title,
        public readonly string $user_id,
        public readonly string $user_email,
        public readonly string $loan_date,
        public readonly string $return_date,
        public readonly string $status,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Loan $loan): self
    {
        $book = Book::where('id', $loan->book_id)->first();
        $user = User::where('id', $loan->user_id)->first();
        return new self(
            id: $loan->id,
            book_id: $loan->book_id,
            book_title: $book->title,
            user_id: $loan->user_id,
            user_email: $user->email,
            loan_date: $loan->loan_date->format('Y-m-d H:i:s'),
            return_date: $loan->return_date ? $loan->return_date->format('Y-m-d H:i:s') : null,
            status: $loan->status,
            created_at: $loan->created_at->format('Y-m-d H:i:s'),
            updated_at: $loan->updated_at->format('Y-m-d H:i:s'),
        );

    }
}
