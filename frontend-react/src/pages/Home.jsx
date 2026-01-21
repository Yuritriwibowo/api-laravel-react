import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isUserLoggedIn } from "../utils/auth";
import "./home.css";

const IMAGE_BASE_URL = "https://api.tokosiregar.online/uploads";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      toast.error("Gagal memuat produk ❌");
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isUserLoggedIn()) {
      toast.info("Silakan login terlebih dahulu 🧑‍💻");
      navigate("/login");
      return;
    }

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
              {p.gambar && (
                <img
                  src={`${IMAGE_BASE_URL}/${encodeURIComponent(p.gambar)}`}
                  alt={p.judul}
                />
              )}
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

      {/* ================= MODAL DETAIL ================= */}
      {selectedBook && (
        <div className="popup-overlay" onClick={() => setSelectedBook(null)}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="popup-header">
              <h4>{selectedBook.judul}</h4>
              <button
                className="close-btn"
                onClick={() => setSelectedBook(null)}
              >
                &times;
              </button>
            </div>

            {/* BODY */}
            <div className="popup-body">
              <div className="popup-image">
                {selectedBook.gambar && (
                  <img
                    src={`${IMAGE_BASE_URL}/${encodeURIComponent(
                      selectedBook.gambar
                    )}`}
                    alt={selectedBook.judul}
                  />
                )}
              </div>

              <div className="popup-details">
                <p><strong>Penulis:</strong> {selectedBook.penulis}</p>
                <p><strong>Penerbit:</strong> {selectedBook.penerbit}</p>
                <p><strong>Tahun Terbit:</strong> {selectedBook.tahun_terbit}</p>
                <p><strong>Kategori:</strong> {selectedBook.kategori}</p>
                <p className="book-price">
                  Rp {Number(selectedBook.harga).toLocaleString("id-ID")}
                </p>
                <p>{selectedBook.deskripsi}</p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="popup-footer">
              <button
                className="btn-primary"
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
