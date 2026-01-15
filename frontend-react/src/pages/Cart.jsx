import React, { useEffect, useState } from "react";
import {
  getCart,
  updateCartQty,
  deleteCartItem,
  createOrder,
} from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isUserLoggedIn } from "../utils/auth";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  /* =========================
     CEK LOGIN USER
  ========================= */
  useEffect(() => {
    if (!isUserLoggedIn()) {
      toast.info("Silakan login untuk melihat keranjang 🛒");
      navigate("/login");
      return;
    }
    load();
  }, []);

  /* =========================
     LOAD CART
  ========================= */
  const load = async () => {
    const data = await getCart();
    setCart(data);
  };

  /* =========================
     QTY HANDLER
  ========================= */
  const increment = async (item) => {
    await updateCartQty(item.id, item.qty + 1);
    load();
  };

  const decrement = async (item) => {
    if (item.qty <= 1) return;
    await updateCartQty(item.id, item.qty - 1);
    load();
  };

  const removeItem = async (id) => {
    if (!window.confirm("Hapus produk dari keranjang?")) return;
    await deleteCartItem(id);
    load();
  };

  /* =========================
     HITUNG TOTAL
  ========================= */
  const totalHarga = cart.reduce(
    (sum, item) => sum + item.qty * item.product.harga,
    0
  );

  /* =========================
     CHECKOUT (STEP 3)
     - SIMPAN ORDER
     - BUKA WHATSAPP
  ========================= */
  const checkoutWhatsApp = async () => {
  if (cart.length === 0) return;

  try {
    // 1️⃣ Simpan order ke database
    const res = await createOrder();
    const orderId = res.order_id;

    const dp = totalHarga * 0.5;

    // 2️⃣ Buat pesan WhatsApp (rapi & profesional)
    let message = `Halo Admin Toko Buku 👋\n\n`;
    message += `Saya ingin melakukan pemesanan dengan detail berikut:\n\n`;
    message += `📦 Order ID: #${orderId}\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.judul}\n`;
      message += `   Qty   : ${item.qty}\n`;
      message += `   Harga : Rp ${item.product.harga.toLocaleString(
        "id-ID"
      )}\n\n`;
    });

    message += `-------------------------\n`;
    message += `💰 Total Belanja : Rp ${totalHarga.toLocaleString(
      "id-ID"
    )}\n`;
    message += `💳 DP (50%)      : Rp ${dp.toLocaleString("id-ID")}\n`;
    message += `-------------------------\n\n`;
    message += `Saya akan melakukan pembayaran DP 50%.\n`;
    message += `Mohon informasi jika pesanan sudah diterima.\n\n`;
    message += `Terima kasih 🙏`;

    // 3️⃣ Encode & buka WhatsApp
    const whatsappUrl = `https://wa.me/628159777660?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  } catch (error) {
    toast.error("Gagal membuat order. Silakan coba lagi.");
  }
};


  /* =========================
     RENDER
  ========================= */
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-5">🛒 Keranjang Belanja</h2>

      {cart.length === 0 ? (
        <div className="text-center text-muted py-5">
          <h5>Keranjang masih kosong</h5>
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => navigate("/")}
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {/* LIST PRODUK */}
          <div className="col-lg-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="card border-0 shadow-sm mb-3 cart-item"
              >
                <div className="card-body d-flex align-items-center">
                  <img
                    src={`https://tokosiregar.online/uploads/${item.product.gambar}`}
                    alt={item.product.judul}
                    className="cart-img"
                  />

                  <div className="flex-grow-1 ms-3">
                    <h6 className="fw-semibold mb-1">
                      {item.product.judul}
                    </h6>
                    <small className="text-muted">
                      {item.product.penulis}
                    </small>

                    <div className="mt-2 fw-bold">
                      Rp{" "}
                      {Number(item.product.harga).toLocaleString("id-ID")}
                    </div>
                  </div>

                  {/* QTY */}
                  <div className="qty-control text-center">
                    <button onClick={() => decrement(item)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increment(item)}>+</button>
                  </div>

                  {/* SUBTOTAL */}
                  <div className="ms-4 fw-bold text-end">
                    Rp{" "}
                    {Number(
                      item.qty * item.product.harga
                    ).toLocaleString("id-ID")}
                    <br />
                    <button
                      className="btn btn-sm btn-link text-danger p-0 mt-1"
                      onClick={() => removeItem(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RINGKASAN */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-lg summary-card">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Ringkasan Belanja</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Total</span>
                  <strong>
                    Rp {totalHarga.toLocaleString("id-ID")}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-3 text-success">
                  <span>DP 50%</span>
                  <strong>
                    Rp {(totalHarga * 0.5).toLocaleString("id-ID")}
                  </strong>
                </div>

                <button
                  className="btn btn-success w-100 btn-lg"
                  onClick={checkoutWhatsApp}
                >
                  Checkout via WhatsApp 💬
                </button>

                <p className="text-muted small mt-3 text-center">
                  * Order diproses setelah DP dikonfirmasi admin
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
