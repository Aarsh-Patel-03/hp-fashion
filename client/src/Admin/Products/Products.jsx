import { useState } from "react";
import { Plus } from "lucide-react";
import ProductTable from "./ProductTable";
import AddEditProductModal from "./AddEditProductModal";

const initialProducts = [
  {
    id: 1,
    name: "Men Denim Jacket",
    category: "Men",
    price: 2999,
    stock: 12,
    status: "active",
    images: [],
    description: "Premium denim jacket",
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSave = (product) => {
    if (editing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editing.id ? product : p))
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...product, id: Date.now() },
      ]);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-5">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={(p) => {
          setEditing(p);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <AddEditProductModal
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
