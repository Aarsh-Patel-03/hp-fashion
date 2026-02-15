import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ProductTable from "./ProductGrid";
import AddEditProductModal from "./AddEditProductModal";
import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../../services/productService";
import Loader from "../common/Loader";
import { toast } from "react-toastify";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        toast.error("Failed to fetch products");
      }).finally(()=>{
        setLoading(false);
      });
  }, []);

  const handleSave = (product) => {
    setLoading(true);
    console.log(product);
    createProduct(product)
      .then((res) => {
        toast.success(res.message);
        getProducts().then((data) => {
          setProducts(data);
        });
      })
      .catch((err) => {
        toast.error("Failed to create product");
      })
      .finally(()=>{
        setLoading(false);
      });

    // if (editing) {
    //   setProducts((prev) =>
    //     prev.map((p) => (p.id === editing.id ? product : p))
    //   );
    // } else {
    //   setProducts((prev) => [
    //     ...prev,
    //     { ...product, id: Date.now() },
    //   ]);
    // }
    setOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteProduct(id)
      .then(() => {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      })
      .catch((err) => {
        toast.error("Failed to delete product");
      })
      .finally(()=>{
        setLoading(false);
      });
  };
  if (loading) return <Loader />;
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
