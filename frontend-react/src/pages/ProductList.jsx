import { useEffect, useState } from "react";
import api from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">Daftar Produk</h2>

      <div className="row g-4">
        {products.map((p) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <div className="card shadow-sm h-100">

              <img 
                src={p.image_url}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">

                <h5 className="card-title">{p.name}</h5>
                <p className="text-muted">Rp {p.price.toLocaleString()}</p>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => api.post("/cart/add", { product_id: p.id })}
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
