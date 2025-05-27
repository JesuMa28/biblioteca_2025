<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Domain\Loans\Models\Loan;

class LoanSeeder extends Seeder
{
    public function run(): void
    {
        Loan::factory()->count(10)->create();
    }
}
