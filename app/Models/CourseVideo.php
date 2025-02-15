<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseVideo extends Model
{
    protected $fillable = [
        'course_id',
        'user_id',
        'created_by',
        'title',
        'path',
        'video_length',
        'brief_description',
        'full_description',
        'references',
        'bio',
        'watched',
        'is_feature',
        'is_publish',
        'modified_date',
    ];
}
