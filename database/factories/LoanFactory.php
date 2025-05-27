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
        return [
            'id' => $this->faker->uuid(),
            'code' => fake()->bothify('LOAN-###??'),
            'book_id' => Book::factory(),
            'user_id' => User::factory(),
            'loan_date' => $this->faker->date(),
            'return_date' => $this->faker->date(),
            'status' => $this->faker->randomElement(['pending', 'returned', 'overdue']),
        ];
    }
}
