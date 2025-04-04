<?php

namespace Database\Factories;

use Domain\Categories\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Categories\Models\Category>
 */

class CategoryFactory extends Factory
{
    /**
     * The model the factory corresponds to.
     *
     * @var string
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        static $names = [

            __('ui.categories.fiction'),
            __('ui.categories.non_fiction'),
            __('ui.categories.science'),
            __('ui.categories.history'),
            __('ui.categories.fantasy'),
            __('ui.categories.horror'),
            __('ui.categories.mystery'),
            __('ui.categories.biography'),
            __('ui.categories.romantic'),
            __('ui.categories.adventure'),

        ];

        static $index = 0;

        return [
            'id' => (string) Str::uuid(),
            'name' => $names[$index++ % count($names)]
        ];
    }
}