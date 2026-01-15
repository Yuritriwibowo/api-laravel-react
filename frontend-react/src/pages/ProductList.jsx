import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="container py-5">
      <h2>Daftar Produk</h2>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div className="card h-100">
              <img
                src={`https://tokosiregar.online/uploads/${p.gambar}`}
                className="card-img-top"
                alt={p.judul}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Image")
                }
              />

              <div className="card-body">
                <h5>{p.judul}</h5>
                <p>Rp {Number(p.harga).toLocaleString("id-ID")}</p>

                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(p.id, 1)}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
