import Navbar from '../components/common/Navbar.jsx';
import HeroSection from '../components/common/HeroSection.jsx';
import Categories from '../components/common/Categories.jsx';
import ProductSection from '../components/common/ProductSection.jsx';
import Footer from '../components/common/Footer.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';

export default function Home() {
  return (
    <div className="bg-neutral-950 text-white">
      <ScrollToTop />
      <Navbar visible={false} backBtn={true} />
      <HeroSection />
      <Categories />
      <ProductSection title="Men's Collection" category="mens"/>
      <ProductSection title="Women's Collection" category="womens"/>
      <ProductSection title="Kids' Collection" category="kids"/>
      <Footer />
    </div>
  );
}
