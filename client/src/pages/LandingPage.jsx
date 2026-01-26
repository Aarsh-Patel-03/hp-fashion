import React from "react";
import HeroCarousel from "../components/common/HeroCarousel.jsx";
import headerImage from "../assets/header.avif";
import { motion } from "framer-motion";

const videos = [1, 2, 3];
const products = [1, 2, 3, 4];
const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};


export default function LandingPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white ">
            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-8 py-6">
                <h1 className="text-2xl font-extrabold tracking-widest">
                    HP Fashion
                </h1>

                <ul className="hidden md:flex gap-8 text-gray-300 text-sm uppercase">
                    {["Home", "Collections", "Sale", "Contact"].map((item) => (
                        <li key={item} className="hover:text-white cursor-pointer">
                            {item}
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
                >
                    Shop Now
                </button>
            </nav>

            {/* HERO */}
            <motion.header
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="px-6 md:px-16 py-20 min-h-[80vh]"
            >
                <div className="mx-auto flex flex-col md:flex-row items-center gap-3 ">
                    <div className="md:w-2/5 text-center md:text-left ">
                        <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm tracking-wide bg-white/10 text-gray-300">
                            Follow the trend with us
                        </span>

                        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            HP Fashion <br />
                            <span className="text-gray-300">Creative Clothing</span>
                        </h2>

                        <p className="mt-5 text-gray-400 max-w-xl">
                            Standout pieces crafted with sustainable materials and bold
                            designs. Limited drops. Timeless style.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                            <button className="px-7 py-3 bg-white text-black rounded-full font-semibold hover:opacity-90 transition">
                                Shop New Arrivals
                            </button>
                            <a
                                href="#collections"
                                className="px-6 py-3 border border-white/20 rounded-full text-sm text-gray-200 hover:bg-white/5 transition"
                            >
                                Explore Collections
                            </a>
                        </div>
                    </div>

                    <div className="md:w-3/5 flex justify-center md:justify-end">
                        <div className="w-[1080px] h-[560px] rounded-3xl overflow-hidden shadow-2xl">
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
                className="px-6 md:px-16"
            >
                <h3 className="text-3xl font-bold mb-8">
                    Collections
                </h3>
                <HeroCarousel />
            </motion.section>

            {/* VIDEO CAROUSEL */}
            <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="px-6 md:px-16 mt-20"
            >
                <h3 className="text-3xl font-bold mb-8">
                    Runway Moments
                </h3>

                <div className="flex gap-6 overflow-x-auto pb-4">
                    {videos.map((item) => (
                        <div
                            key={`video-${item}`}
                            className="min-w-[280px] md:min-w-[360px] h-[240px] rounded-2xl bg-neutral-800 flex items-center justify-center"
                        >
                            <span className="text-gray-300">
                                Video {item}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* PRODUCTS */}
            <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="px-6 md:px-16 mt-24"
            >
                <h3 className="text-3xl font-bold mb-10">
                    Trending Products
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((item) => (
                        <article
                            key={`product-${item}`}
                            className="bg-neutral-900 rounded-2xl p-4 hover:scale-105 transition"
                        >
                            <div className="h-56 bg-neutral-800 rounded-xl mb-4" />
                            <h4 className="font-semibold">
                                Product {item}
                            </h4>
                            <p className="text-gray-400 text-sm">
                                ₹1,999
                            </p>
                        </article>
                    ))}
                </div>
            </motion.section>

            {/* COLLECTIONS & SALE */}
            {/* <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.25 }}
                className="px-6 md:px-16 mt-24 grid md:grid-cols-3 gap-8"
            >
                <div className="md:col-span-2 h-[300px] rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold">
                        New Collection 2026
                    </h3>
                    <p className="text-gray-200 mt-2">
                        Bold. Modern. Unapologetic.
                    </p>
                </div>

                <div className="h-[300px] rounded-3xl bg-red-600 p-10 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold">Sale</h3>
                    <p className="text-gray-200 mt-2">
                        Up to 50% OFF
                    </p>
                </div>
            </motion.section> */}

            {/* FOOTER */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-32 border-t border-white/10 px-6 md:px-16 py-12 grid md:grid-cols-4 gap-8 text-gray-400 text-sm"
            >
                <div>
                    <h4 className="text-white font-bold mb-4">
                        HP Fashion
                    </h4>
                    <p>Modern streetwear for the bold generation.</p>
                </div>

                {["Shop", "Company", "Follow Us"].map((title) => (
                    <div key={title}>
                        <h4 className="text-white font-semibold mb-3">
                            {title}
                        </h4>
                        <ul className="space-y-2">
                            <li>Item One</li>
                            <li>Item Two</li>
                            <li>Item Three</li>
                        </ul>
                    </div>
                ))}
            </motion.footer>
        </div>
    );
}
