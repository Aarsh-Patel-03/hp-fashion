import React from "react";
import HeroCarousel from "../components/common/HeroCarousel.jsx";
import VideoCarousel from "../components/common/VideoCarousel.jsx";
import ProductCarousel from "../components/common/ProductCarousel.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import Navbar from "../components/common/Navbar.jsx";
import headerImage from "../assets/header.avif";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../assets/heroImages/1.avif";
import img2 from "../assets/heroImages/2.webp";
import img3 from "../assets/heroImages/3.jpg";
import img4 from "../assets/heroImages/4.jpg";
import vd1 from "../assets/heroVideos/1.mp4";
import vd2 from "../assets/heroVideos/2.mp4";
import vd3 from "../assets/heroVideos/3.mp4";
import vd4 from "../assets/heroVideos/4.mp4";
import vd5 from "../assets/heroVideos/5.mp4";
import p1 from "../assets/products/1.jpg";
import p2 from "../assets/products/2.webp";
import p3 from "../assets/products/3.webp";
import p4 from "../assets/products/4.webp";
import p5 from "../assets/products/5.webp";
import p6 from "../assets/products/6.webp";
import p7 from "../assets/products/7.jpg";
import Footer from "../components/common/Footer.jsx";

const images = [img1, img2, img3, img4, img1, img2, img3, img4];
const videos = [vd1, vd2, vd3, vd4, vd5, vd1, vd2, vd3, vd4, vd5];
const products = [p1, p2, p3, p4, p5, p6, p7, p1, p2, p3, p4, p5, p6, p7];
const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
export default function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white ">
      <ScrollToTop />
      
      <Navbar />
      {/* HERO */}
      <motion.header
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  className="relative px-6 md:px-16 py-20 min-h-[80vh] overflow-hidden"
>
  {/* MOBILE BACKGROUND IMAGE */}
  <div className="absolute inset-0 md:hidden">
    <img
      src={headerImage}
      alt="HP Fashion clothing showcase"
      className="w-full h-full object-cover"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60" />
  </div>

  <div className="relative mx-auto flex flex-col md:flex-row items-center gap-8">
    {/* TEXT SECTION */}
    <div className="md:w-2/5 text-center md:text-left text-white">
      <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm tracking-wide bg-white/10 text-gray-200">
        Follow the trend with us
      </span>

      <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
        HP Fashion <br />
        <span className="text-gray-300">Creative Clothing</span>
      </h2>

      <p className="mt-5 text-gray-300 max-w-xl mx-auto md:mx-0">
        Standout pieces crafted with sustainable materials and bold designs.
        Limited drops. Timeless style.
      </p>

      <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
        <button
          className="px-7 py-3 bg-white text-black rounded-full font-semibold hover:opacity-90 transition"
          onClick={() => navigate("/home")}
        >
          Shop New Arrivals
        </button>

        <a
          href="#collections"
          className="px-6 py-3 border border-white/30 rounded-full text-sm text-gray-200 hover:bg-white/10 transition"
        >
          Explore Collections
        </a>
      </div>
    </div>

    {/* DESKTOP IMAGE */}
    <div className="hidden md:flex md:w-3/5 justify-end">
      <div className="w-full h-[560px] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={headerImage}
          alt="HP Fashion clothing showcase"
          className="w-full h-full object-cover hover:scale-105 transition duration-700"
        />
      </div>
    </div>
  </div>
</motion.header>


      {/* IMAGE CAROUSEL */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="md:px-16"
        id="collections"
      >
        <h3 className="text-3xl font-bold mb-8 pt-10 px-6">Collections</h3>
        <HeroCarousel images={images} />
      </motion.section>
 
      {/* VIDEO CAROUSEL */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="md:px-16 mt-20"
        id="runway_moments"
      >
        <h3 className="text-3xl font-bold mb-8 pt-10 px-6">Runway Moments</h3>
        <VideoCarousel videos={videos} />
      </motion.section>

      {/* PRODUCTS */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="px-6 md:px-16 mt-24"
        id="products"
      >
        <h3 className="text-3xl font-bold mb-10">Trending Products</h3>

        <ProductCarousel products={products} />
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        id="contact"
      >
       <Footer /> 
      </motion.footer>
    </div>
  );
}
