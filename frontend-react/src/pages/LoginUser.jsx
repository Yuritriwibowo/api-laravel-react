import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api";
import { toast } from "react-toastify";

function LoginUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await userLogin(email, password);
      toast.success("Login berhasil 🎉");
      navigate("/");
    } catch {
      toast.error("Email atau password salah");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h4 className="text-center mb-3">Login User</h4>

            <form onSubmit={submit}>
              <input
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <p className="text-center mt-3">
              Belum punya akun?{" "}
              <span
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => navigate("/register")}
              >
                Daftar
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
