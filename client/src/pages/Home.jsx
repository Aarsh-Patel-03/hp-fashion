import React from 'react';
import Navbar from '../components/common/Navbar.jsx';
import HeroSection from '../components/common/HeroSection.jsx';
import Categories from '../components/common/Categories.jsx';
import ProductSection from '../components/common/ProductSection.jsx';
import Footer from '../components/common/Footer.jsx';

export default function Home() {
  return (
    <div className="bg-neutral-950 text-white">
      <Navbar visible={false} />
      <HeroSection />
      <Categories />
      <ProductSection title="Men Collection" />
      <ProductSection title="Women Collection" />
      <Footer />
    </div>
  );
}
