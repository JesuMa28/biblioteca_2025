<?php

namespace Domain\Reservations\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\ReservationFactory;
use Domain\Reservations\Models\Reservation;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;

class Reservation extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = [
        'id',
        'code',
        'book_id',
        'user_id',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function newFactory()
    {
        return ReservationFactory::new();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function books() {
        return $this->belongsTo(Book::class);
    }
}
