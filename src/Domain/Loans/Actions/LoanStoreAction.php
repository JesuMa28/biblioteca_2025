<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Illuminate\Support\Facades\Hash;
use App\Notifications\BookLoanedNotification;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;

class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {

        $loan = Loan::create([
            'code' => $data['code'],
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
            'loan_date' => $data['loan_date'],
            'return_date' => $data['return_date'],
            'status' => $data['status'],
        ]);

        $loanResource = LoanResource::fromModel($loan);

        $user = $loan->user; // O recupera el usuario como tengas definido
        $user->notify(new BookLoanedNotification($loanResource));


        // Actualizar el estado del libro a 'Loaned'
        $book = Book::find($data['book_id']);
        if ($book) {
            $book->status = 'Loaned'; // debe coincidir exactamente con el valor ENUM
            $book->save();
        }

        return LoanResource::fromModel($loan);
    }
}
