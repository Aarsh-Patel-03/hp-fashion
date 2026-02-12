import React, { useState,useEffect } from 'react';
import Navbar from '../components/common/Navbar.jsx';
import HeroSection from '../components/common/HeroSection.jsx';
import Categories from '../components/common/Categories.jsx';
import ProductSection from '../components/common/ProductSection.jsx';
import Footer from '../components/common/Footer.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';
import { toast } from "react-toastify";
import { getProducts } from '../services/productService.js';

export default function Home() {

  const [products, setProducts] = useState([]);
   useEffect(() => {
      getProducts()
        .then((data) => {
          console.log("Products fetched:", data);
          setProducts(data);
        })
        .catch((err) => {
          toast.error("Failed to fetch products");
        });
    }, []);

  return (
    <div className="bg-neutral-950 text-white">
      <ScrollToTop />
      <Navbar visible={false} backBtn={true} />
      <HeroSection />
      <Categories />
      <ProductSection title="Men's Collection" products={products.filter(p => p.categories.some(cat => cat.name.toLowerCase() === "mens"))} />
      <ProductSection title="Women's Collection" products={products.filter(p => p.categories.some(cat => cat.name.toLowerCase() === "womens"))} />
      
      <Footer />
    </div>
  );
}
