const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const createCategory = async (data) => {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
};


export const deleteCategory = async (id) => {

  const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete category");
  }

  return result;
};
