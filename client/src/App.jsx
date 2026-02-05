import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";
import AllProductsPage from "./pages/AllProductsPage.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import Categories from "./Admin/Category/Categories.jsx";
import Products from "./Admin/Products/Products.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all-products" element={<AllProductsPage />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<div className="p-6"><h1 className="text-2xl font-bold">Admin Dashboard</h1><p>Welcome to the admin panel.</p></div>} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
