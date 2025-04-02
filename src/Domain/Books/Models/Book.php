<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'author', 'category_name', 'shelf_id'];

    public function shelf()
    {
        return $this->belongsTo(Shelf::class);
    }
}
