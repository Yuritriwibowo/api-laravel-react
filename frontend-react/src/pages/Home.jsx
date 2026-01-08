import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isUserLoggedIn, isAdminLoggedIn } from "../utils/auth";
import "./home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      toast.error("Gagal memuat produk ❌");
    }
  };

  // 🔐 PROTEKSI TAMBAH KE KERANJANG
  const handleAddToCart = async (productId) => {
   
    // ❌ USER BELUM LOGIN
    if (!isUserLoggedIn()) {
      toast.info("Silakan login terlebih dahulu 🧑‍💻");
      navigate("/login");
      return;
    }

    // ✅ USER LOGIN
    try {
      await addToCart(productId, 1);
      toast.success("Produk berhasil ditambahkan ke keranjang 🛒");
    } catch {
      toast.error("Gagal menambahkan produk ❌");
    }
  };

  return (
    <div className="home-container">
      <h2 className="section-title">📚 Produk Terbaru</h2>

      <div className="grid-products">
        {products.map((p) => (
          <div className="book-card" key={p.id}>
            <div className="image-wrapper">
              <img
                src={`http://localhost:8000/uploads/${encodeURIComponent(
                  p.gambar
                )}`}
                alt={p.judul}
              />
            </div>

            <div className="book-info">
              <h4 className="book-title">{p.judul}</h4>
              <p className="book-price">
                Rp {Number(p.harga).toLocaleString("id-ID")}
              </p>

              <button
                className="btn-primary"
                onClick={() => handleAddToCart(p.id)}
              >
                Tambah ke Keranjang
              </button>

              <button
                className="btn-secondary"
                onClick={() => setSelectedBook(p)}
              >
                Lihat Buku
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP DETAIL */}
{selectedBook && (
  <div className="popup-overlay" onClick={() => setSelectedBook(null)}>
    <div
      className="popup-content popup-modern"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="popup-header d-flex justify-content-between align-items-center">
        <h5 className="fw-bold m-0">{selectedBook.judul}</h5>
        <button className="btn-close" onClick={() => setSelectedBook(null)} />
      </div>

      {/* BODY */}
      <div className="popup-body row mt-3">
        {/* GAMBAR */}
        <div className="col-md-5 text-center">
          <img
            src={`http://localhost:8000/uploads/${encodeURIComponent(
              selectedBook.gambar
            )}`}
            alt={selectedBook.judul}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "320px", objectFit: "cover" }}
          />
        </div>

        {/* DETAIL */}
        <div className="col-md-7">
          <table className="table table-borderless small">
            <tbody>
              <tr>
                <th style={{ width: "35%" }}>Penulis</th>
                <td>: {selectedBook.penulis}</td>
              </tr>
              <tr>
                <th>Penerbit</th>
                <td>: {selectedBook.penerbit}</td>
              </tr>
              <tr>
                <th>Tahun Terbit</th>
                <td>: {selectedBook.tahun_terbit}</td>
              </tr>
              <tr>
                <th>Kategori</th>
                <td>: {selectedBook.kategori}</td>
              </tr>
              <tr>
                <th>Harga</th>
                <td className="fw-bold text-primary">
                  : Rp{" "}
                  {Number(selectedBook.harga).toLocaleString("id-ID")}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-2">
            <strong>Deskripsi:</strong>
            <p className="text-muted small mt-1">
              {selectedBook.deskripsi || "Tidak ada deskripsi"}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="popup-footer mt-3">
        <button
          className="btn btn-primary w-100"
          onClick={() => handleAddToCart(selectedBook.id)}
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Home;
