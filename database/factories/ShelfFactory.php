<?php

namespace Database\Factories;

use Domain\Shelves\Models\Shelf;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Shelves\Models\Shelf>
 */
class ShelfFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Shelf::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => fake()->bothify('FLR-###??'),
            'capacity' => fake()->numberBetween(1, 10),
            'zone_id' => Zone::factory(),
        ];
    }
}
