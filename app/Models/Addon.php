<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Addon
 *
 * @property int $id
 * @property string $name
 * @property string $version
 * @property string $download_link
 * @property string|null $description
 * @property string|null $image_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Changelog> $changelogs
 * @property-read int|null $changelogs_count
 * @property-read \App\Models\Changelog|null $latest_changelog
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Addon newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Addon newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Addon query()
 * @method static \Illuminate\Database\Eloquent\Builder|Addon whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Addon whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Addon whereDownloadLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Addon whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Addon whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Addon whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Addon whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Addon whereVersion($value)
 * @method static \Database\Factories\AddonFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Addon extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'version',
        'download_link',
        'description',
        'image_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all changelogs for this addon.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function changelogs(): HasMany
    {
        return $this->hasMany(Changelog::class);
    }

    /**
     * Get the latest changelog for this addon.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function latestChangelog()
    {
        return $this->hasOne(Changelog::class)->latest();
    }
}