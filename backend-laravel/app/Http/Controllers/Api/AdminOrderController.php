<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    // LIST SEMUA ORDER
    public function index()
    {
        return Order::with('items.product', 'user')
            ->latest()
            ->get();
    }

    // DETAIL ORDER
    public function show($id)
    {
        return Order::with('items.product', 'user')
            ->findOrFail($id);
    }

    // KONFIRMASI DP
    public function confirmDp($id)
    {
        $order = Order::findOrFail($id);

        $order->update([
            'status' => 'DP_LUNAS'
        ]);

        return response()->json([
            'message' => 'DP berhasil dikonfirmasi'
        ]);
    }
}
