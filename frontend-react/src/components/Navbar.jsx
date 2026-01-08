import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isUserLoggedIn, isAdminLoggedIn } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userLoggedIn = isUserLoggedIn();
  const adminLoggedIn = isAdminLoggedIn();

  // 🔒 JANGAN TAMPILKAN NAVBAR DI HALAMAN ADMIN
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const handleLogout = () => {
    if (!window.confirm("Yakin ingin logout?")) return;
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg nav-modern px-4 py-3"
      style={{ position: "sticky", top: 0, zIndex: 999 }}
    >
      <div className="container-fluid">
        {/* LOGO */}
        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
          style={{ letterSpacing: "1px" }}
        >
          📚 BookStore
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler shadow-sm"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* HOME */}
            <li className="nav-item">
              <Link className="btn btn-outline-primary btn-sm mx-2 fw-semibold"
                    to="/">
                🏠 Home
              </Link>
            </li>

            {/* CART (HANYA USER LOGIN) */}
            {userLoggedIn && (
              <li className="nav-item">
                <Link className="btn btn-outline-primary btn-sm mx-2 fw-semibold" to="/cart">
                  🛒 Keranjang
                </Link>
              </li>
            )}

            {/* ================= USER BELUM LOGIN ================= */}
            {!userLoggedIn && !adminLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary btn-sm mx-2 fw-semibold"
                    to="/login">
                    🔑 Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-outline-primary btn-sm mx-2 fw-semibold"
                    to="/register"
                  >
                    📝 Register
                  </Link>
                </li>
              </>
            )}

            {/* ================= USER SUDAH LOGIN ================= */}
            {userLoggedIn && (
              <li className="nav-item ms-2">
                <button
                  className="btn btn-outline-danger btn-sm fw-semibold"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
