<?php

namespace Domain\Zones\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\ZoneFactory;
use Domain\Zones\Models\Zone;
use Domain\Categories\Models\Category;

class Zone extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = [
        'name',
        'capacity',
        'floor_id',
        'n_shelves'
    ];

    protected static function newFactory()
    {
        return ZoneFactory::new();
    }

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }

    public function shelves()
    {
        return $this->hasMany(Shelf::class);
    }

    public function categories() {
        return $this->morphToMany(Category::class, 'categorizable');
    }

}
