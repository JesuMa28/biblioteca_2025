<?php

namespace Domain\Loans\Data\Resources;

use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;
use Carbon\Carbon;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $code,
        public readonly string $book_id,
        public readonly string $book_title,
        public readonly string $user_id,
        public readonly string $user_email,
        public readonly string $loan_date,
        public readonly string $return_date,
        public readonly string $status,
        public readonly int $delay_days,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Loan $loan): self
    {
        $book = Book::where('id', $loan->book_id)->first();
        $user = User::where('id', $loan->user_id)->first();

        $today = Carbon::now();
        $returnDate = $loan->return_date;

        $delayDays = 0;
        if ($today->greaterThan($returnDate)) {
            $delayDays = $returnDate->diffInDays($today);
        }

        return new self(
            id: $loan->id,
            code: $loan->code,
            book_id: $loan->book_id,
            book_title: $book->title,
            user_id: $loan->user_id,
            user_email: $user->email,
            loan_date: $loan->loan_date->format('Y/m/d H:i:s'),
            return_date: $loan->return_date->format('Y/m/d H:i:s'),
            delay_days: $delayDays,
            status: $loan->status,
            created_at: $loan->created_at->format('Y-m-d H:i:s'),
            updated_at: $loan->updated_at->format('Y-m-d H:i:s'),
        );

    }
}
