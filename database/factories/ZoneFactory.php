<?php

namespace Database\Factories;

use Domain\Zones\Models\Zone;
use Domain\Categories\Models\Category;
use Domain\Floors\Models\Floor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Zones\Models\Zone>
 */
class ZoneFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Zone::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'capacity' => $this->faker->numberBetween(1, 10),
            'floor_id' => Floor::factory(),
            'category_id' => Category::factory(),

        ];
    }
}
