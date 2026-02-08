import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AddEditCategoryModal from "./AddEditCategoryModal";
import CategoryTable from "./CategoryTable";
import { getCategories, deleteCategory } from "../../services/categoryService";
import { toast } from "react-toastify";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success("Category deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 mt-5">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={(cat) => {
          setEditing(cat);
          setOpen(true);
        }}
        onDelete={handleDelete}
        onToggleStatus={(id) =>
          setCategories((prev) =>
            prev.map((c) =>
              c._id === id
                ? {
                  ...c,
                  status: c.status === "active" ? "inactive" : "active",
                }
                : c
            )
          )
        }
      />

      <AddEditCategoryModal
        open={open}
        initialData={editing}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={fetchCategories}
      />
    </div>
  );
}
