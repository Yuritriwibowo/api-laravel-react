<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('judul');
        $table->string('penulis');
        $table->string('penerbit');
        $table->string('tahun_terbit');
        $table->string('kategori');
        $table->integer('harga');
        $table->text('deskripsi')->nullable();
        $table->string('gambar');
        $table->timestamps();
    });
}


};
