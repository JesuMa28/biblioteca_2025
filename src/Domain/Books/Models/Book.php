<?php

namespace Domain\Books\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\BookFactory;
use Domain\Books\Models\Book;
use Domain\Categories\Models\Category;

class Book extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = [
        'id',
        'title',
        'author',
        'editorial',
        'language',
        'published_year',
        'isbn',
        'pages',
        'shelf_id',
    ];

    protected static function newFactory()
    {
        return BookFactory::new();
    }

    public function shelf()
    {
        return $this->belongsTo(Shelf::class);
    }

    public function categories() {
        return $this->morphToMany(Category::class, 'categorizable');
    }
}
