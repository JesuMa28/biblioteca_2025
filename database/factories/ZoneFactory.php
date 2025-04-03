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
            'category_name' => Category::inRandomOrder()->first()->name ?? Category::factory()->create()->name,
            'floor_id' => \Domain\Floors\Models\Floor::inRandomOrder()->first()?->id ?? \Domain\Floors\Models\Floor::factory()->create()->id,

        ];
    }
}
