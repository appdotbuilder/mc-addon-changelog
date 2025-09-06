<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Changelog
 *
 * @property int $id
 * @property int $addon_id
 * @property string $version
 * @property string|null $summary
 * @property string $download_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Addon $addon
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ChangelogEntry> $entries
 * @property-read int|null $entries_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog query()
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog whereAddonId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog whereDownloadLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog whereSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Changelog whereVersion($value)
 * @method static \Database\Factories\ChangelogFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Changelog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'addon_id',
        'version',
        'summary',
        'download_link',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'addon_id' => 'integer',
    ];

    /**
     * Get the addon that owns this changelog.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function addon(): BelongsTo
    {
        return $this->belongsTo(Addon::class);
    }

    /**
     * Get all entries for this changelog.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function entries(): HasMany
    {
        return $this->hasMany(ChangelogEntry::class)->orderBy('order');
    }
}