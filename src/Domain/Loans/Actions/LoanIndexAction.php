<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;

class LoanIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $loans = Loan::query()
            ->when($search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                    ->orWhere('book_title', 'like', "%{$search}%")
                    ->orWhere('user_email', 'like', "%{$search}%")
                    ->orWhere('loan_date', 'like', "%{$search}%")
                    ->orWhere('return_date', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");

                })
            ->latest()
            ->paginate($perPage);

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
