import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    penerbit: "",
    tahun_terbit: "",
    kategori: "Novel",
    harga: "",
    deskripsi: "",
    gambar: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getProductById(id);
    setForm({ ...data, gambar: null });

    if (data.gambar) {
      setPreview(
        `http://localhost:8000/uploads/${encodeURIComponent(data.gambar)}`
      );
    }
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "gambar") {
      setForm({ ...form, gambar: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "gambar" || form.gambar instanceof File) {
        data.append(key, form[key]);
      }
    });

    await updateProduct(id, data);

    alert("Produk berhasil diperbarui ✅");
    navigate("/admin/dashboard");
  };

  return (
    <div className="container py-4 fade-in">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">✏️ Edit Produk Buku</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ⬅ Kembali
        </button>
      </div>

      {/* CARD */}
      <div className="card shadow-lg border-0 p-4 modern-card">
        <form onSubmit={submit}>
          <div className="row g-4">

            {/* FORM LEFT */}
            <div className="col-md-8">
              <div className="mb-3">
                <label className="form-label fw-semibold">Judul Buku</label>
                <input
                  className="form-control modern-input"
                  name="judul"
                  value={form.judul}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Penulis</label>
                  <input
                    className="form-control modern-input"
                    name="penulis"
                    value={form.penulis}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Penerbit</label>
                  <input
                    className="form-control modern-input"
                    name="penerbit"
                    value={form.penerbit}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Tahun Terbit</label>
                  <input
                    type="number"
                    className="form-control modern-input"
                    name="tahun_terbit"
                    value={form.tahun_terbit}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Kategori</label>
                  <select
                    className="form-control modern-input"
                    name="kategori"
                    value={form.kategori}
                    onChange={onChange}
                  >
                    <option value="Novel">Novel</option>
                    <option value="Komik">Komik</option>
                    <option value="Pendidikan">Pendidikan</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Harga</label>
                  <input
                    type="number"
                    className="form-control modern-input"
                    name="harga"
                    value={form.harga}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Deskripsi Buku</label>
                <textarea
                  className="form-control modern-input"
                  rows="4"
                  name="deskripsi"
                  value={form.deskripsi}
                  onChange={onChange}
                  required
                />
              </div>

              <button className="btn btn-primary px-4 py-2 shadow-sm">
                ✔ Simpan Perubahan
              </button>
            </div>

            {/* FORM RIGHT */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Gambar Buku</label>
              <div className="upload-box">
                <input
                  type="file"
                  name="gambar"
                  className="form-control modern-input"
                  accept="image/*"
                  onChange={onChange}
                />

                {preview ? (
                  <img src={preview} className="preview-img mt-3" />
                ) : (
                  <div className="text-muted small mt-3">
                    Preview gambar akan tampil di sini
                  </div>
                )}
              </div>
            </div>

          </div>
        </form>
      </div>

      {/* STYLE */}
      <style>{`
        .fade-in {
          animation: fadeIn 0.5s ease;
        }

        .modern-input {
          border-radius: 12px;
          padding: 10px 14px;
          border: 1px solid #d0d0d0;
          transition: all 0.2s ease;
        }

        .modern-input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13,110,253,.15);
        }

        .upload-box {
          border: 2px dashed #d0d0d0;
          border-radius: 16px;
          padding: 16px;
          text-align: center;
          transition: 0.2s;
        }

        .upload-box:hover {
          border-color: #0d6efd;
        }

        .preview-img {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default EditProduct;
