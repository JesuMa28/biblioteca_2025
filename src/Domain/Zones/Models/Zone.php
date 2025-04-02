<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory;
    protected $fillable = ['name', capacity, 'category_name', 'floor_id'];

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }

    public function shelves()
    {
        return $this->hasMany(Shelf::class);
    }

}
