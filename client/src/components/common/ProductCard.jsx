import { Image as ImageIcon } from "lucide-react";

export default function ProductCard({ product, setSelectedProduct }) {
  const hasImage = product.images && product.images.length > 0;

  return (
    <div
      onClick={() => setSelectedProduct?.(product)}
      className="group bg-neutral-900 rounded-2xl overflow-hidden cursor-pointer
                 border border-neutral-800
                 shadow-sm hover:shadow-2xl hover:-translate-y-1
                 transition-all duration-300"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-56 bg-neutral-800 flex items-center justify-center overflow-hidden">
        {hasImage ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="h-full w-full object-cover
                       group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center text-neutral-500">
            <ImageIcon size={44} />
            <span className="text-xs mt-2">No Image</span>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 space-y-2">
        {/* PRODUCT NAME */}
        <h3 className="text-sm font-semibold text-white truncate">
          {product.name}
        </h3>

        {/* CATEGORIES */}
        <div className="flex flex-wrap gap-1">
          {product.categories?.slice(0, 2).map((cat) => (
            <span
              key={cat._id || cat}
              className="text-[10px] px-2 py-0.5 rounded-full
                         bg-neutral-800 text-neutral-300"
            >
              {cat.name || cat}
            </span>
          ))}

          {product.categories?.length > 2 && (
            <span className="text-[10px] text-neutral-400">
              +{product.categories.length - 2}
            </span>
          )}
        </div>

        {/* PRICE & STOCK */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-white font-bold text-sm">
            ₹{product.price}
          </span>

          <span
            className={`text-xs ${
              product.stock > 0
                ? "text-green-400"
                : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `Available`
              : "Out of stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
