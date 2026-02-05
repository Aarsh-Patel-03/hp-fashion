import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddEditProductModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "active",
    images: [],
    description: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  if (!open) return null;

  const handleImageChange = (e) => {
    setForm({
      ...form,
      images: [...form.images, ...Array.from(e.target.files)],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-auto">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {initialData ? "Edit Product" : "Add Product"}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            placeholder="Product name"
            className="w-full border rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Category"
            className="w-full border rounded-lg px-3 py-2"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

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

          <textarea
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* Multiple Images */}
          <input
            type="file"
            multiple
            onChange={handleImageChange}
          />

          {/* Status */}
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Actions */}
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
