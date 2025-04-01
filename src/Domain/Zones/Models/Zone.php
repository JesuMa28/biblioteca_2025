<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'floor_id', 'category_id'];

    public function floor()
    {
        return $this->belongsTo(Floor::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function shelves()
    {
        return $this->hasMany(Shelf::class);
    }

}
