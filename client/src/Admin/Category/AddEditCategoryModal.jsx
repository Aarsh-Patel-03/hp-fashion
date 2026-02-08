import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "../../services/categoryService";
import { toast } from "react-toastify";

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
    if (initialData) {
      setForm({
        name: initialData.name,
        status: initialData.status,
      });
    } else {
      setForm({ name: "", status: "active" });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialData) {
        await updateCategory(initialData._id, form);
        toast.success("Category updated");
      } else {
        await createCategory(form);
        toast.success("Category added");
      }

      onSave();
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {initialData ? "Edit Category" : "Add Category"}
          </h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

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
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
