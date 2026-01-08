import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../api";
import { toast } from "react-toastify";

function RegisterUser() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Semua field wajib diisi ❌");
      return;
    }

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter ❌");
      return;
    }

    try {
      setLoading(true);

      // Register user
      await userRegister(name, email, password);

      toast.success("Registrasi berhasil 🎉 Silakan login");
      navigate("/login"); // ✅ KEMBALI KE LOGIN
    } catch (err) {
      toast.error("Registrasi gagal (email mungkin sudah terdaftar) ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0 p-4">
            <h3 className="text-center mb-4 fw-bold">Register User</h3>

            <form onSubmit={submit}>
              <div className="mb-3">
                <label>Nama Lengkap</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <button className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Memproses..." : "Register"}
              </button>
            </form>

            <p className="text-center mt-3">
              Sudah punya akun?{" "}
              <span
                style={{ color: "#0d6efd", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
