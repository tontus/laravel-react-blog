<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'user_id'];
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function author()
    {
        return $this->belongsTo(User::class);
    }
    public static function boot() {
        parent::boot();

        static::deleting(function($post) { // before delete() method call this
            $post->comments()->delete();
        });
    }
}
