<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'total_harga',
        'dp',
        'status'
    ];

    // RELASI KE USER (PEMESAN)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // RELASI KE ITEM ORDER
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
