import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
function ProductSection({ title,products=[],allProducts=false }) {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <section className="px-6 md:px-16 py-6">
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {title && <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        {!allProducts && <button className="text-sm text-gray-400 hover:text-white" onClick={() => navigate("/all-products")}>
          View More →
        </button>}
      </div>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.products.map((item) => (
            <ProductCard key={item.id} product={item} setSelectedProduct={setSelectedProduct} />
        ))}
      </div>
    </section>
  );
}
export default ProductSection;