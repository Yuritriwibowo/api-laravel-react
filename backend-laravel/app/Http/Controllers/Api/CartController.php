<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Cart::with('product')
            ->where('user_id', $user->id)
            ->get();
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        // Jika produk sudah ada di cart → update qty
        $cart = Cart::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cart) {
            $cart->qty += $request->qty;
            $cart->save();

            return response()->json([
                'message' => 'Jumlah produk diperbarui',
            ]);
        }

        // Jika belum ada → create baru (INI YANG PENTING)
        Cart::create([
            'user_id'    => $user->id,   // ✅ FIX UTAMA
            'product_id' => $request->product_id,
            'qty'        => $request->qty,
        ]);

        return response()->json([
            'message' => 'Produk berhasil ditambahkan ke keranjang',
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'qty' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        $cart = Cart::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $cart->qty = $request->qty;
        $cart->save();

        return response()->json([
            'message' => 'Jumlah produk diperbarui',
        ]);
    }

    public function delete(Request $request, $id)
    {
        $user = $request->user();

        Cart::where('id', $id)
            ->where('user_id', $user->id)
            ->delete();

        return response()->json([
            'message' => 'Produk dihapus dari keranjang',
        ]);
    }
}
