import React from 'react';
import Navbar from '../components/common/Navbar.jsx';
import HeroSection from '../components/common/HeroSection.jsx';
import Categories from '../components/common/Categories.jsx';
import ProductSection from '../components/common/ProductSection.jsx';
import Footer from '../components/common/Footer.jsx';
import mensProducts from '../utils/mensProducts.json';
import womensProducts  from '../utils/womensProducts.json';
export default function Home() {
  return (
    <div className="bg-neutral-950 text-white">
      <Navbar visible={false} />
      <HeroSection />
      <Categories />
      <ProductSection title="Men Collection" products={mensProducts} />
      <ProductSection title="Women Collection" products={womensProducts} />
      <Footer />
    </div>
  );
}
