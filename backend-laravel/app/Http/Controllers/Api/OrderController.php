<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        // 🔒 Safety check
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $cart = Cart::with('product')
            ->where('user_id', $user->id)
            ->get();

        if ($cart->isEmpty()) {
            return response()->json([
                'message' => 'Keranjang kosong'
            ], 400);
        }

        // 🔒 Pastikan produk masih ada
        foreach ($cart as $item) {
            if (!$item->product) {
                return response()->json([
                    'message' => 'Produk pada keranjang tidak ditemukan'
                ], 400);
            }
        }

        $total = $cart->sum(function ($item) {
            return $item->qty * $item->product->harga;
        });

        $dp = (int) ($total * 0.5);

        // 1️⃣ Buat order
        $order = Order::create([
            'user_id' => $user->id,
            'total_harga' => $total,
            'dp' => $dp,
            'status' => 'MENUNGGU_DP'
        ]);

        // 2️⃣ Simpan item
        foreach ($cart as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'qty' => $item->qty,
                'harga' => $item->product->harga
            ]);
        }

        // 3️⃣ Kosongkan cart
        Cart::where('user_id', $user->id)->delete();

        return response()->json([
            'message' => 'Order berhasil dibuat',
            'order_id' => $order->id
        ]);
    }



            // HAPUS ORDER
           public function destroy($id)
        {
            $order = Order::findOrFail($id);

            // STATUS YANG BOLEH DIHAPUS
            if (!in_array($order->status, ['MENUNGGU_DP', 'CANCELLED'])) {
                return response()->json([
                    'message' => 'Order tidak dapat dihapus karena sudah diproses'
                ], 403);
            }

            // HAPUS ITEM TERKAIT
            $order->items()->delete();

            // HAPUS ORDER
            $order->delete();

            return response()->json([
                'message' => 'Order berhasil dihapus'
            ]);
        }


}
