<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Illuminate\Support\Facades\Hash;

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

        return LoanResource::fromModel($loan);
    }
}
