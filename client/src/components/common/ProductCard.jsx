import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import img1 from "../../assets/products/1.jpg";

export default function ProductCard({
  image = img1,
  title = "Classic White T-Shirt",
  price = 29.99,
  originalPrice = null,
  inStock = true,
  rating = 4.5,
  reviewCount = 128,
  category = "T-Shirts",
  sizes = ["S", "M", "L", "XL"],
  colors = ["#FFFFFF", "#000000", "#3B82F6"],
  discount = null,
  isNew = false,
  isBestseller = false,
}) {
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  return (
    <div className="w-[280px] overflow-hidden rounded-lg shadow-md bg-white hover:shadow-2xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-[340px] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          draggable={false}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-600 text-white">
              NEW
            </span>
          )}
          {isBestseller && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500 text-white">
              BESTSELLER
            </span>
          )}
          {discountPercentage && (
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-600 text-white">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-4 py-2 text-sm font-bold rounded-lg bg-red-600 text-white">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {category}
        </p>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Sizes */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Sizes:</span>
          <div className="flex gap-1.5">
            {sizes.map((size, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[11px] font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Stock Status */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              inStock
                ? "text-green-700 bg-green-50"
                : "text-red-700 bg-red-50"
            }`}
          >
            {inStock ? "In Stock" : "Unavailable"}
          </span>
        </div>
        
      </div>
    </div>
  );
}