<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Illuminate\Support\Facades\Hash;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $updateData = [
            'code' => $data['code'],
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
            'loan_date' => $data['loan_date'],
            'return_date' => $data['return_date'],
            'status' => $data['status'],
        ];

        $loan->update($updateData);

        return LoanResource::fromModel($loan->fresh());
    }
}
