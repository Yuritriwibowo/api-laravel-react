import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="mt-5"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#eaeaea",
      }}
    >
      <div className="container py-5">
        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3">📚 BookStore</h4>
            <p style={{ fontSize: "0.9rem", color: "#cfd8dc" }}>
              Platform katalog dan penjualan buku berbasis web yang dirancang
              untuk memberikan pengalaman belanja buku yang mudah, cepat,
              dan nyaman.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3 text-uppercase">
              Navigasi
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="footer-link">Keranjang</Link>
              </li>
              
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3 text-uppercase">
              Kontak
            </h6>
            <p className="mb-1" style={{ fontSize: "0.9rem" }}>
              📍 Comingsoon
            </p>
            <p className="mb-1" style={{ fontSize: "0.9rem" }}>
              📧 Comingsoon
            </p>
            <p className="mb-0" style={{ fontSize: "0.9rem" }}>
              📞 Comingsoon
            </p>
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        className="text-center py-3"
        style={{
          backgroundColor: "rgba(0,0,0,0.25)",
          fontSize: "0.85rem",
          color: "#b0bec5",
        }}
      >
        © {new Date().getFullYear()} BookStore • All Rights Reserved
      </div>

      {/* STYLE KHUSUS */}
      <style>
        {`
          .footer-link {
            color: #cfd8dc;
            text-decoration: none;
            transition: all 0.2s ease;
            font-size: 0.9rem;
          }

          .footer-link:hover {
            color: #ffffff;
            padding-left: 6px;
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;
