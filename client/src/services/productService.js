const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
/* ================= CREATE PRODUCT ================= */
export const createProduct = async (productData) => {
    try {
        const formData = new FormData();

        // Text fields
        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("stock", productData.stock);
        formData.append("description", productData.description || "");

        // Categories (multiple)
        productData.categories?.forEach((catId) => {
            formData.append("categories", catId);
        });

        // Images (multiple)
        productData.images?.forEach((image) => {
            formData.append("images", image);
        });
        const response = await fetch(`${BASE_URL}/api/products`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create product");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/products`, {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch products");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

/* ================= GET SINGLE PRODUCT ================= */
export const getProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch product");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (id, productData) => {
    try {
        const formData = new FormData();

        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("stock", productData.stock);
        formData.append("status", productData.status);
        formData.append("description", productData.description || "");

        // Categories
        productData.categories?.forEach((catId) => {
            formData.append("categories[]", catId);
        });

        // New images only
        productData.images?.forEach((image) => {
            formData.append("images", image);
        });

        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: "PUT",
            body: formData,
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update product");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete product");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

