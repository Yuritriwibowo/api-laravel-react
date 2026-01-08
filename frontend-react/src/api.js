import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

/* ============================
   AUTH HEADER
=============================== */
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
   ADMIN LOGIN
=============================== */
export async function adminLogin(email, password) {
  try {
    const res = await axios.post(`${API_URL}/admin/login`, {
      email,
      password,
    });

    localStorage.setItem("adminToken", res.data.token);
    return res.data;
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    throw err;
  }
}

/* ============================
   USER LOGIN
=============================== */
export async function userLogin(email, password) {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  localStorage.setItem("userToken", res.data.token);
  return res.data;
}

/* ============================
   USER REGISTER
=============================== */
export async function userRegister(name, email, password) {
  const res = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });

  localStorage.setItem("userToken", res.data.token);
  return res.data;
}

/* ============================
   PRODUCT
=============================== */
export async function getProducts() {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
}

export async function getProductById(id) {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
}

export async function createProduct(formData) {
  const res = await axios.post(
    `${API_URL}/products`,
    formData,
    {
      ...adminAuthHeader(),
      headers: {
        ...adminAuthHeader().headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
}

export async function updateProduct(id, formData) {
  formData.append("_method", "PUT");

  const res = await axios.post(
    `${API_URL}/products/${id}`,
    formData,
    {
      ...adminAuthHeader(),
      headers: {
        ...adminAuthHeader().headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
}

export async function deleteProduct(id) {
  const res = await axios.delete(
    `${API_URL}/products/${id}`,
    adminAuthHeader()
  );
  return res.data;
}

/* ============================
   CART (USER ONLY)
=============================== */
export async function addToCart(productId, qty) {
  const res = await axios.post(
    `${API_URL}/cart`,
    { product_id: productId, qty },
    userAuthHeader()
  );
  return res.data;
}

export async function getCart() {
  const res = await axios.get(
    `${API_URL}/cart`,
    userAuthHeader()
  );
  return res.data;
}

export async function updateCartQty(id, qty) {
  const res = await axios.put(
    `${API_URL}/cart/${id}`,
    { qty },
    userAuthHeader()
  );
  return res.data;
}

export async function deleteCartItem(id) {
  const res = await axios.delete(
    `${API_URL}/cart/${id}`,
    userAuthHeader()
  );
  return res.data;
}

/* ============================
   ORDER (STEP 3 – CHECKOUT)
=============================== */
export async function createOrder() {
  const res = await axios.post(
    `${API_URL}/orders`,
    {},
    userAuthHeader()
  );
  return res.data;
}

/* ============================
   ADMIN ORDER
=============================== */
export async function getAdminOrders() {
  const res = await axios.get(
    `${API_URL}/admin/orders`,
    adminAuthHeader()
  );
  return res.data;
}

export async function confirmDp(orderId) {
  const res = await axios.put(
    `${API_URL}/admin/orders/${orderId}/confirm-dp`,
    {},
    adminAuthHeader()
  );
  return res.data;
}

export async function deleteOrder(id) {
  return axios.delete(
    `${API_URL}/admin/orders/${id}`,
    adminAuthHeader()
  );
}



/* ============================
   DEFAULT EXPORT (OPTIONAL)
=============================== */
export default {
  adminLogin,
  userLogin,
  userRegister,

  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,

  addToCart,
  getCart,
  updateCartQty,
  deleteCartItem,

  createOrder,
};
