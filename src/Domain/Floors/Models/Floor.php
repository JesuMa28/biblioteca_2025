<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Floor extends Model
{
    use HasFactory;
    protected $fillable = ['number', capacity];

    public function zones()
    {
        return $this->hasMany(Zone::class);
    }
}
