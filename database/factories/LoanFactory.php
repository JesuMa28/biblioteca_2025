<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;

class LoanFactory extends Factory
{
    protected $model = Loan::class;
    public function definition(): array
    {
        $loanDate = $this->faker->dateTimeBetween('-1 month', 'now');
        $returnDate = $this->faker->dateTimeBetween($loanDate, '+1 month');

        return [
            'id' => $this->faker->uuid(),
            'code' => fake()->bothify('LOAN-###??'),
            'book_id' => Book::factory(),
            'user_id' => User::factory(),
            'loan_date' => $this->faker->dateTime()->format('Y/m/d H:i:s'),
            'return_date' => $this->faker->dateTime()->format('Y/m/d H:i:s'),
            'status' => $this->faker->randomElement(['pending', 'returned', 'overdue']),
        ];
    }
}
