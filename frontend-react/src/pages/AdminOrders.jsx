import React, { useEffect, useState } from "react";
import { getAdminOrders, confirmDp, deleteOrder } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAdminOrders();
      setOrders(data);
    } catch (err) {
      toast.error("Gagal mengambil data order");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     KONFIRMASI DP
  ===================== */
  const handleConfirmDp = async (id) => {
    if (!window.confirm("Konfirmasi DP 50% untuk order ini?")) return;

    try {
      await confirmDp(id);
      toast.success("DP berhasil dikonfirmasi ✅");
      load();
    } catch (err) {
      toast.error("Gagal konfirmasi DP ❌");
    }
  };

  /* =====================
     HAPUS ORDER (TERBATAS)
  ===================== */
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Yakin ingin menghapus order ini?")) return;

    try {
      await deleteOrder(id);
      toast.success("Order berhasil dihapus 🗑");
      load();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Order tidak dapat dihapus"
      );
    }
  };

  /* =====================
     BADGE STATUS
  ===================== */
  const renderStatus = (status) => {
    switch (status) {
      case "MENUNGGU_DP":
        return <span className="badge bg-warning">Menunggu DP</span>;
      case "DP_LUNAS":
        return <span className="badge bg-success">DP Lunas</span>;
      case "PROCESSING":
        return <span className="badge bg-info">Diproses</span>;
      case "COMPLETED":
        return <span className="badge bg-primary">Selesai</span>;
      case "CANCELLED":
        return <span className="badge bg-secondary">Dibatalkan</span>;
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">📦 Daftar Order</h2>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ⬅ Kembali
        </button>
      </div>

      <div className="card shadow border-0 p-3">
        {loading ? (
          <p className="text-center text-muted">Loading...</p>
        ) : (
          <table className="table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Total</th>
                <th>DP 50%</th>
                <th>Status</th>
                <th style={{ width: "240px" }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Belum ada order
                  </td>
                </tr>
              ) : (
                orders.map((order, i) => (
                  <tr key={order.id}>
                    <td>{i + 1}</td>
                    <td>{order.user?.name || "-"}</td>
                    <td>
                      Rp {Number(order.total_harga).toLocaleString("id-ID")}
                    </td>
                    <td>
                      Rp {Number(order.dp).toLocaleString("id-ID")}
                    </td>
                    <td>{renderStatus(order.status)}</td>

                    <td>
                      <div className="d-flex gap-2 flex-wrap">

                        {/* KONFIRMASI DP */}
                        {order.status === "MENUNGGU_DP" && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleConfirmDp(order.id)}
                          >
                            Konfirmasi DP
                          </button>
                        )}

                        {/* HAPUS (HANYA STATUS TERTENTU) */}
                        {(order.status === "MENUNGGU_DP" ||
                          order.status === "CANCELLED") && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            Hapus Order
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
