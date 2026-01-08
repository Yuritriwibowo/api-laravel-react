<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            "judul" => "required",
            "penulis" => "required",
            "penerbit" => "required",
            "tahun_terbit" => "required",
            "kategori" => "required",
            "harga" => "required",
            "deskripsi" => "nullable",
            "gambar" => "required|image"
        ]);

        $filename = time() . '-' . $request->gambar->getClientOriginalName();
        $request->gambar->move(public_path("uploads"), $filename);

        $product = Product::create([
            "judul" => $request->judul,
            "penulis" => $request->penulis,
            "penerbit" => $request->penerbit,
            "tahun_terbit" => $request->tahun_terbit,
            "kategori" => $request->kategori,
            "harga" => $request->harga,
            "deskripsi" => $request->deskripsi,
            "gambar" => $filename
        ]);

        return response()->json([
            "success" => true,
            "message" => "Produk berhasil ditambahkan",
            "product" => $product
        ]);
    }

   public function update(Request $request, $id)
{
    if ($request->input('_method') === 'PUT') {
        $request->setMethod('PUT');
    }

    $product = Product::findOrFail($id);

    if ($request->hasFile("gambar")) {
        $file = $request->file("gambar");
        $filename = time() . '-' . $file->getClientOriginalName();
        $file->move(public_path("uploads"), $filename);
        $product->gambar = $filename;
    }

    $product->judul = $request->judul;
    $product->penulis = $request->penulis;
    $product->penerbit = $request->penerbit;
    $product->tahun_terbit = $request->tahun_terbit;
    $product->kategori = $request->kategori;
    $product->harga = $request->harga;
    $product->deskripsi = $request->deskripsi;

    $product->save();

    return response()->json([
        "success" => true,
        "message" => "Produk berhasil diperbarui",
        "product" => $product
    ]);
}

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return ["message" => "Berhasil dihapus"];
    }
}
