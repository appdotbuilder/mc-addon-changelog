<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Addon>
 */
class AddonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $addonNames = [
            'WorldEdit Plus',
            'CustomNPCs Extended',
            'Better Villages',
            'Magic Items Pack',
            'Advanced Machinery',
            'Realistic Animals',
            'Enhanced Biomes',
            'Sky Dimension',
            'Crafting Table Upgrade',
            'Better Combat System'
        ];

        return [
            'name' => fake()->randomElement($addonNames),
            'version' => fake()->semver(),
            'download_link' => fake()->url(),
            'description' => fake()->sentence(10),
            'image_url' => fake()->imageUrl(400, 300, 'minecraft'),
        ];
    }

    /**
     * Indicate that the addon is popular.
     */
    public function popular(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Popular ' . fake()->randomElement(['Mod', 'Addon', 'Pack']),
        ]);
    }
}