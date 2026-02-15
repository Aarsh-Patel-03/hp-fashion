import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { getProducts } from "../../services/productService";
import { useEffect } from "react";
import { toast } from "react-toastify"; 

function ProductSection({ title,allProducts=false,category }) {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts(4,[category])
          .then((data) => {
            setProducts(data);
          })
          .catch((err) => {
            toast.error("Failed to fetch products");
          });
      }, [category]);
  return (
    <section className="px-6 md:px-16 py-6" id={title ? title.toLowerCase().replace(" ", "_") : ""}>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {title && <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        {!allProducts && <button className="text-sm text-gray-400 hover:text-white" onClick={() => navigate(`/all-products/${category}`)}>
          View More →
        </button>}
      </div>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item) => (
            <ProductCard key={item._id} product={item} setSelectedProduct={setSelectedProduct} />
        ))}
      </div>
    </section>
  );
}
export default ProductSection;