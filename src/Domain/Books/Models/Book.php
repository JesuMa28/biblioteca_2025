<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'author',
        'editorial',
        'language',
        'category_name',
        'published_year',
        'isbn',
        'pages',
        'shelf_id'
    ];

    public function shelf()
    {
        return $this->belongsTo(Shelf::class);
    }
}
