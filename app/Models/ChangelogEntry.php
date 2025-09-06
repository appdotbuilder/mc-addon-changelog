<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ChangelogEntry
 *
 * @property int $id
 * @property int $changelog_id
 * @property string $type
 * @property string $title
 * @property string|null $description
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Changelog $changelog
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry query()
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry whereChangelogId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChangelogEntry whereUpdatedAt($value)
 * @method static \Database\Factories\ChangelogEntryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ChangelogEntry extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'changelog_id',
        'type',
        'title',
        'description',
        'order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'changelog_id' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Available change types.
     *
     * @var array<string, string>
     */
    public const TYPES = [
        'feature' => 'New Feature',
        'bug_fix' => 'Bug Fix',
        'improvement' => 'Improvement',
        'removal' => 'Removal',
        'environment' => 'Environment Addition',
    ];

    /**
     * Get the changelog that owns this entry.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function changelog(): BelongsTo
    {
        return $this->belongsTo(Changelog::class);
    }
}