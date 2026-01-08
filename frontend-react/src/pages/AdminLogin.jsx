import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api";
import { toast } from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const success = await adminLogin(email, password);

    if (success) {
      toast.success("Login admin berhasil");
      navigate("/admin/dashboard");
    } else {
      toast.error("Login admin gagal");
    }
  };

  return (
    <div className="container-fluid bg-dark min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-4 shadow">
              <h4 className="text-center mb-3 text-danger">
                Admin Login
              </h4>

              <form onSubmit={submit}>
                <input
                  className="form-control mb-3"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-danger w-100">
                  Login Admin
                </button>
              </form>

              <small className="text-center mt-3 d-block text-muted">
                Halaman khusus administrator
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
