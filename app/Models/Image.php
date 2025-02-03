<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['course_id', 'path', 'is_default'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
