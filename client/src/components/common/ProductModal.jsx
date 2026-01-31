import { useEffect } from "react";

export default function ProductModal({ product, onClose }) {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center ">
      {/* Click outside to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="bg-black max-w-4xl w-full mx-4 rounded overflow-hidden z-10 ">
        {/* Close button */}

        <div className="relative grid md:grid-cols-2 gap-6 p-6 bg-black text-white">
            <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded mt-5"
          />

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">{product.title}</h2>

            <p className="text-gray-600">{product.description}</p>

            <p className="text-xl font-semibold">₹{product.price}</p>

            <span
              className={`w-fit px-3 py-1 text-sm rounded ${
                product.stock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock ? "Available" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
