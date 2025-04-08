<?php

namespace Database\Factories;

use Domain\Floors\Models\Floor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Floors\Models\Floor>
 */
class FloorFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Floor::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'number' => $this->faker->unique()->numberBetween(1, 20),
            'capacity' => fake()->numberBetween(0, 10),
        ];
    }

}
