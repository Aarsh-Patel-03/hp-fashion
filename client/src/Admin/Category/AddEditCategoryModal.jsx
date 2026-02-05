import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createCategory } from "../../services/categoryService";
export default function AddEditCategoryModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    status: "active",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);

  }, [initialData]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const handleAddCategory = async () => {
  try {
    await createCategory({
      name: form.name,
      status: form.status,
    });

    alert("Category added successfully");
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {initialData ? "Edit Category" : "Add Category"}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Category name"
            className="w-full border rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg"
              onClick={handleAddCategory}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
