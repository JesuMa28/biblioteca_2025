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

    // Polimorphic Relations
    public function books() {
        return $this->morphedByMany(Book::class, 'categorizable');
    }

    public function zones() {
        return $this->morphedByMany(Zone::class, 'categorizable');
    }

    public function shelves() {
        return $this->morphedByMany(Shelf::class, 'categorizable');
    }

    // En Book.php, Zone.php, Shelf.php
    public function categories() {
        return $this->morphToMany(Category::class, 'categorizable');
    }
}
