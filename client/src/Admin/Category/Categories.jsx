import { useState,useEffect } from "react";
import { Plus } from "lucide-react";
import AddEditCategoryModal from "./AddEditCategoryModal";
import CategoryTable from "./CategoryTable";
import { getCategories, createCategory, deleteCategory } from "../../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data);
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleSave = async (category) => {
    try {
      if (editing) {
        // Update existing category
        const updatedCategory = await createCategory({ ...category, id: editing._id });
        setCategories((prev) =>
          prev.map((c) => (c._id === editing._id ? updatedCategory : c))
        );
      } else {
        // Create new category
        const newCategory = await createCategory(category);
        setCategories((prev) => [...prev, newCategory]);
      }
      setEditing(null);
      setOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (!confirmDelete) return;

  try {
    await deleteCategory(id);
    alert("Category deleted successfully");

  } catch (err) {
    alert(err.message);
  }
};

//   const handleToggleStatus = async (id) => {
//     try {
//       const category = categories.find((c) => c._id === id);
//       if (!category) return;

//       const newStatus = category.status === "active" ? "inactive" : "active";
//       const updatedCategory = await createCategory({ ...category, status: newStatus, id });
//       setCategories((prev) =>
//         prev.map((c) => (c._id === id ? updatedCategory : c))
//       );
//     } catch (err) {
//       alert(err.message);
//     }
//   };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-5">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Category Table */}
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
              c.id === id
                ? {
                    ...c,
                    status: c.status === "active" ? "inactive" : "active",
                  }
                : c,
            ),
          )
        }
      />

      {/* Modal */}
      <AddEditCategoryModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initialData={editing}
      />
    </div>
  );
}
