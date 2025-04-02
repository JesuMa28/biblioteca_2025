<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shelf extends Model
{
    use HasFactory;
    protected $fillable = ['code', capacity, 'category_name', 'zone_id'];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
