import axios from "axios";

/* ============================
   BASE API URL
============================ */
const API_URL = import.meta.env.VITE_API_URL;

/* ============================
   AXIOS INSTANCE
============================ */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/* ============================
   AUTH HEADER
============================ */
const userAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
});

const adminAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

/* ============================
   AUTH
============================ */
export async function adminLogin(email, password) {
  const res = await api.post("/admin/login", { email, password });
  localStorage.setItem("adminToken", res.data.token);
  return res.data;
}

export async function userLogin(email, password) {
  const res = await api.post("/login", { email, password });
  localStorage.setItem("userToken", res.data.token);
  return res.data;
}

export async function userRegister(name, email, password) {
  const res = await api.post("/register", { name, email, password });
  localStorage.setItem("userToken", res.data.token);
  return res.data;
}

/* ============================
   PRODUCT
============================ */
export async function getProducts() {
  const res = await api.get("/products");
  return Array.isArray(res.data) ? res.data : [];
}

export async function getProductById(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(formData) {
  const res = await api.post("/products", formData, {
    ...adminAuthHeader(),
    headers: {
      ...adminAuthHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateProduct(id, formData) {
  formData.append("_method", "PUT");

  const res = await api.post(`/products/${id}`, formData, {
    ...adminAuthHeader(),
    headers: {
      ...adminAuthHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/products/${id}`, adminAuthHeader());
  return res.data;
}

/* ============================
   CART
============================ */
export async function addToCart(productId, qty = 1) {
  const token = localStorage.getItem("userToken");
  if (!token) throw new Error("User belum login");

  const res = await api.post(
    "/cart",
    { product_id: productId, qty },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}

export async function getCart() {
  const res = await api.get("/cart", userAuthHeader());
  return res.data;
}

export async function updateCartQty(id, qty) {
  const res = await api.put(`/cart/${id}`, { qty }, userAuthHeader());
  return res.data;
}

export async function deleteCartItem(id) {
  const res = await api.delete(`/cart/${id}`, userAuthHeader());
  return res.data;
}

/* ============================
   ORDER
============================ */
export async function createOrder() {
  const res = await api.post("/orders", {}, userAuthHeader());
  return res.data;
}

/* ============================
   ADMIN ORDER
============================ */
export async function getAdminOrders() {
  const res = await api.get("/admin/orders", adminAuthHeader());
  return res.data;
}

export async function confirmDp(orderId) {
  const res = await api.put(
    `/admin/orders/${orderId}/confirm-dp`,
    {},
    adminAuthHeader()
  );
  return res.data;
}

export async function deleteOrder(id) {
  const res = await api.delete(`/admin/orders/${id}`, adminAuthHeader());
  return res.data;
}
