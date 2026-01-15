<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    /* =========================
       GET CART
    ========================== */
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        return response()->json(
            Cart::with('product')
                ->where('user_id', $user->id)
                ->get()
        );
    }

    /* =========================
       ADD TO CART
    ========================== */
    public function add(Request $request)
    {
        $user = $request->user();

        // 🔥 GUARD WAJIB (ANTI user_id NULL)
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'qty'        => 'required|integer|min:1',
        ]);

        // Jika produk sudah ada → update qty
        $cart = Cart::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cart) {
            $cart->qty += $request->qty;
            $cart->save();

            return response()->json([
                'message' => 'Jumlah produk diperbarui',
                'data'    => $cart
            ]);
        }

        // Jika belum ada → create baru
        $cart = Cart::create([
            'user_id'    => $user->id, // ✅ TIDAK PERNAH NULL
            'product_id' => $request->product_id,
            'qty'        => $request->qty,
        ]);

        return response()->json([
            'message' => 'Produk berhasil ditambahkan ke keranjang',
            'data'    => $cart
        ], 201);
    }

    /* =========================
       UPDATE QTY
    ========================== */
    public function update(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'qty' => 'required|integer|min:1',
        ]);

        $cart = Cart::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $cart->qty = $request->qty;
        $cart->save();

        return response()->json([
            'message' => 'Jumlah produk diperbarui',
            'data'    => $cart
        ]);
    }

    /* =========================
       DELETE CART
    ========================== */
    public function delete(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        Cart::where('id', $id)
            ->where('user_id', $user->id)
            ->delete();

        return response()->json([
            'message' => 'Produk dihapus dari keranjang',
        ]);
    }
}
