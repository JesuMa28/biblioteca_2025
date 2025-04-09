<?php

namespace Domain\Categories\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\CategoryFactory;
use Domain\Categories\Models\Category;

class Category extends Model
{

    use HasUuids, HasFactory;
    protected $fillable = [
            'id',
            'name'
        ];

    protected static function newFactory()
    {
        return CategoryFactory::new();
    }

    public function zones() {
        return $this->hasMany(Zone::class);
    }

    public function shelves() {
        return $this->hasMany(Shelf::class);
    }
    // Polimorphic Relations
    public function books() {
        return $this->belongsToMany(Book::class);
    }


}
