import { X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

export default function AddEditProductModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    categories: [],
    price: "",
    stock: "",
    images: [],
    description: "",
  });

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  /* ================= EDIT MODE ================= */
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        categories: initialData.categories || [],
        price: initialData.price || "",
        stock: initialData.stock || "",
        description: initialData.description || "",
        images: [], // new uploads only
      });
    } else {
      setForm({
        name: "",
        categories: [],
        price: "",
        stock: "",
        images: [],
        description: "",
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  /* ================= IMAGE HANDLERS ================= */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /* ================= CATEGORY TAG TOGGLE ================= */
  const toggleCategory = (id) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {initialData ? "Edit Product" : "Add Product"}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <input
            required
            placeholder="Product name"
            className="w-full border rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* Categories as Tags */}
          <div>
            <p className="text-sm font-medium mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat._id}
                  onClick={() => toggleCategory(cat._id)}
                  className={`px-3 py-1 rounded-full text-sm border ${form.categories.includes(cat._id)
                    ? "bg-black text-white"
                    : "bg-gray-100"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Stock */}
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Price"
              className="w-full border rounded-lg px-3 py-2"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Stock"
              className="w-full border rounded-lg px-3 py-2"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <textarea
            placeholder="Description"
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* ================= IMAGE UPLOAD ================= */}
          <div>
            <p className="text-sm font-medium mb-2">Images</p>

            <div className="flex gap-3 flex-wrap">
              {/* Previews */}
              {form.images.map((img, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add Image Box */}
              <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <Plus />
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
