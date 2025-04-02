<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shelf extends Model
{
    use HasFactory;
    protected $fillable = ['code', capacity, 'zone_id', 'category_id'];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
