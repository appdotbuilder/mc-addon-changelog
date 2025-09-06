<?php

namespace Database\Seeders;

use App\Models\Addon;
use App\Models\Changelog;
use App\Models\ChangelogEntry;
use Illuminate\Database\Seeder;

class AddonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create addons with changelogs
        Addon::factory(10)->create()->each(function ($addon) {
            // Create 1-3 changelogs per addon
            $changelogCount = random_int(1, 3);
            
            for ($i = 0; $i < $changelogCount; $i++) {
                $changelog = Changelog::factory()->create([
                    'addon_id' => $addon->id,
                    'created_at' => now()->subDays(random_int(1, 30)),
                ]);
                
                // Create 2-8 entries per changelog
                $entryCount = random_int(2, 8);
                
                for ($j = 0; $j < $entryCount; $j++) {
                    ChangelogEntry::factory()->create([
                        'changelog_id' => $changelog->id,
                        'order' => $j,
                    ]);
                }
            }
        });
    }
}