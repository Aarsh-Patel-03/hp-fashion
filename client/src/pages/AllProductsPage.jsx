import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ScrollToTop from '../components/common/ScrollToTop.jsx';
import ProductCard from "../components/common/ProductCard.jsx";
import ProductModal from "../components/common/ProductModal.jsx";
export default function AllProductsPage() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { category } = useParams();
   useEffect(() => {
      getProducts(0, [category])
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          toast.error("Failed to fetch products");
        });
    }, [category]);
  return (
    <div className="bg-neutral-950 text-white">
        <ScrollToTop />
      <Navbar visible={false} backBtn={true} />
      <section className="px-6 md:px-16 py-6">
              {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
              <h2 className="text-2xl font-semibold mb-6">{category.charAt(0).toUpperCase() + category.slice(1)} Collection</h2>
      
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((item) => (
                  <ProductCard key={item._id} product={item} setSelectedProduct={setSelectedProduct} />
              ))}
            </div>
          </section>
      <Footer />
    </div>
  )
}
