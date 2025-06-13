<?php

namespace Database\Factories;

use Domain\Books\Models\Book;
use Domain\Shelves\Models\Shelf;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Books\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'author' => fake()->name(),
            'editorial' => $this->faker->company(), // Simula una editorial
            'language' => $this->faker->randomElement(['English', 'Spanish', 'French', 'German', 'Italian']),
            'published_year' => fake()->year(),
            'isbn' => fake()->isbn13(),
            'pages' => fake()->numberBetween(100, 1000),
            'shelf_id' => Shelf::factory(),
            'status' => $this->faker->randomElement(['Available']),
        ];
    }
}
