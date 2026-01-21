  export default function ProductCard({ product, addToCart }) {
    return (
      <div className="border p-4 rounded shadow">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p>Harga: Rp {product.price}</p>
        <p>Stok: {product.stock}</p>

        <button
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => addToCart(product)}
        >
          Tambah ke Keranjang
        </button>
      </div>
    );
  }
