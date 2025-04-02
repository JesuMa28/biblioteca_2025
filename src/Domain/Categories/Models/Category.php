<?php

namespace Domain\Categories\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    protected $fillable = ['name'];

    public function zones()
    {
        return $this->hasMany(Zone::class);
    }

    public function shelves()
    {
        return $this->hasMany(Shelf::class);
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
