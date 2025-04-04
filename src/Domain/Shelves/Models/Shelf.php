<?php

namespace Domain\Shelves\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\ShelfFactory;
use Domain\Shelves\Models\Shelf;
use Domain\Categories\Models\Category;

class Shelf extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = [
        'code',
        'capacity',
        'category_name',
        'zone_id',
        'n_books',
    ];


    protected static function newFactory()
    {
        return ShelfFactory::new();
    }

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function categories() {
        return $this->morphToMany(Category::class, 'categorizable');
    }
}
