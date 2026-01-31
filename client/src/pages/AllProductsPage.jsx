import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ProductSection from '../components/common/ProductSection'
import mensProducts from '../utils/mensProducts.json';
import ScrollToTop from '../components/common/ScrollToTop.jsx';
export default function AllProductsPage() {
  return (
    <div className="bg-neutral-950 text-white">
        <ScrollToTop />
      <Navbar visible={false} backBtn={true} />
      <ProductSection title={"Men's Collection"} products={mensProducts} allProducts={true} />
      <Footer />
    </div>
  )
}
