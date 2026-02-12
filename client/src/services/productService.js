// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASE_URL = import.meta.env.VITE_API_URL || "https://hp-fashion.vercel.app";

/* ================= CREATE OR UPDATE ================= */
export const createProduct = async (productData) => {
  try {
    const formData = new FormData();

    // Only append _id if editing
    if (productData._id) {
      formData.append("_id", productData._id);
    }

    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("description", productData.description || "");

    productData.categories?.forEach((catId) => {
      formData.append("categories", catId);
    });

    // New images
    productData.images?.forEach((image) => {
      formData.append("images", image);
    });

    // IMPORTANT: Send only public_ids
    productData.imagesToKeep?.forEach((public_id) => {
      formData.append("imagesToKeep", public_id);
    });

    const response = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;

  } catch (error) {
    throw error;
  }
};

/* ================= GET ALL ================= */
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/api/products`);
  return await res.json();
};

/* ================= GET ONE ================= */
export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/products/${id}`);
  return await res.json();
};

/* ================= DELETE ================= */
export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};
