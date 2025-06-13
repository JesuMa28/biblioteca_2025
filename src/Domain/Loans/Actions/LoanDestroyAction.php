<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;


class LoanDestroyAction
{
    public function __invoke(Loan $loan): void
    {
        $book = Book::find($loan->book_id);

        if ($book) {
            $book->status = 'Available'; // debe coincidir exactamente con el valor ENUM
            $book->save();
        }

        $loan->delete();

    }
}
