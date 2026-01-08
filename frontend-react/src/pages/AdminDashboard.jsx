import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // CEK LOGIN ADMIN
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Silakan login sebagai admin");
      navigate("/admin/login");
    }
  }, [navigate]);

  // LOAD DATA
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  // DELETE PRODUK
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      await deleteProduct(id);
      alert("Produk berhasil dihapus ✅");
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk ❌ (Unauthorized)");
    }
  };

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h3 className="sidebar-title">📚 Admin </h3>

        <button
          className="sidebar-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className="sidebar-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          ➕ Tambah Produk
        </button>
        <button className="sidebar-btn"onClick={() => navigate("/admin/orders")}>
        📦 Kelola Order
      </button>


        <button
          className="sidebar-logout"
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/admin/login");
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-main">
        <h2 className="dashboard-title">Dashboard Admin</h2>

        <div className="card shadow-lg border-0 p-4 modern-card">
          <h4 className="mb-3 fw-bold">📘 Daftar Produk Buku</h4>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table modern-table align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th>Tahun</th>
                  <th>Harga</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Tidak ada produk
                    </td>
                  </tr>
                ) : (
                  products.map((p, index) => (
                    <tr key={p.id} className="fade-in">
                      <td>{index + 1}</td>
                      <td>{p.judul}</td>
                      <td>{p.penulis}</td>
                      <td>{p.tahun_terbit}</td>
                      <td>Rp {Number(p.harga).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            navigate(`/admin/edit-product/${p.id}`)
                          }
                        >
                          ✏ Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(p.id)}
                        >
                          🗑 Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
