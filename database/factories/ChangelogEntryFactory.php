<?php

namespace Database\Factories;

use App\Models\Changelog;
use App\Models\ChangelogEntry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChangelogEntry>
 */
class ChangelogEntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $features = [
            'Added new block types',
            'Improved world generation',
            'Enhanced user interface',
            'New crafting recipes',
            'Better mob AI'
        ];

        $bugFixes = [
            'Fixed crash when opening inventory',
            'Resolved texture loading issues',
            'Fixed multiplayer synchronization',
            'Corrected item duplication bug',
            'Fixed world corruption issue'
        ];

        $improvements = [
            'Optimized performance',
            'Improved graphics quality',
            'Enhanced sound effects',
            'Better compatibility',
            'Smoother animations'
        ];

        return [
            'changelog_id' => Changelog::factory(),
            'type' => fake()->randomElement(array_keys(ChangelogEntry::TYPES)),
            'title' => fake()->randomElement(array_merge($features, $bugFixes, $improvements)),
            'description' => fake()->paragraph(2),
            'order' => fake()->numberBetween(0, 10),
        ];
    }

    /**
     * Indicate that the entry is a bug fix.
     */
    public function bugFix(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'bug_fix',
            'title' => 'Fixed ' . fake()->randomElement(['crash', 'bug', 'issue', 'problem']) . ' with ' . fake()->word(),
        ]);
    }

    /**
     * Indicate that the entry is a new feature.
     */
    public function feature(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'feature',
            'title' => 'Added ' . fake()->randomElement(['new', 'improved', 'enhanced']) . ' ' . fake()->word(),
        ]);
    }
}