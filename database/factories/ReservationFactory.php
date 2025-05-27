<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Domain\Reservations\Models\Reservation;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;
    public function definition(): array
    {

        return [
            'id' => $this->faker->uuid(),
            'code' => fake()->bothify('RSV-###??'),
            'book_id' => Book::factory(),
            'user_id' => User::factory(),
        ];
    }
}
