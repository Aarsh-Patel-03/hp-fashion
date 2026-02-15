// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://hp-fashion.onrender.com";

/* ================= ADMIN LOGIN ================= */
export const adminLogin = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save token
    localStorage.setItem("adminToken", data.token);

    return data;
  } catch (error) {
    throw error;
  }
};

/* ================= LOGOUT ================= */
export const adminLogout = () => {
  localStorage.removeItem("adminToken");
};

/* ================= GET TOKEN ================= */
export const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};

/* ================= CHECK AUTH ================= */
export const isAdminAuthenticated = () => {
  return !!localStorage.getItem("adminToken");
};
