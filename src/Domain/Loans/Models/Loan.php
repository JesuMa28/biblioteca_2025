<?php

namespace Domain\Loans\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Database\Factories\LoanFactory;
use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;

class Loan extends Model
{
    use HasUuids, HasFactory;
    protected $fillable = [
        'id',
        'code',
        'book_id',
        'user_id',
        'loan_date',
        'return_date',
        'status',
    ];

    protected static function newFactory()
    {
        return LoanFactory::new();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function books() {
        return $this->belongsTo(Book::class);
    }
}
