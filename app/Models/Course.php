<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'duration',
        'rating',
        'start_date',
        'end_date',
        'user_id',
    ];

    /**
     * Get the categories for the course.
     * @return BelongsToMany Category
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'course_category', 'course_id', 'category_id');
    }

    /**
     * Get the images for the course.
     * @return HasMany Image
     */
    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    /**
     * Get the user that owns the course.
     * @return BelongsTo User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courseContents(): HasMany
    {
        return $this->hasMany(CourseContent::class);
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];
}
