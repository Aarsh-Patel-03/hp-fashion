import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductModal({ product, onClose }) {
  const images = product.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);


  const nextImage = useCallback(()=> {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  },[images.length]); 

  const prevImage = useCallback(()=> {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  },[images.length]); 

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex,onClose,prevImage,nextImage]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) nextImage();  
    if (diff < -50) prevImage();   
  };

  const hasImages = images.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="bg-black max-w-5xl w-full mx-4 rounded-xl overflow-hidden z-10">
        <div className="relative grid md:grid-cols-2 gap-6 p-6 text-white">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl hover:opacity-70"
          >
            ✕
          </button>
          <div
            className="relative w-full h-[400px] bg-neutral-800 rounded overflow-hidden flex items-center justify-center mt-7"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {hasImages ? (
              <>
                <img
                  src={images[currentIndex].url}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-500"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2
                                 bg-black/50 p-2 rounded-full hover:bg-black"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2
                                 bg-black/50 p-2 rounded-full hover:bg-black"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition ${
                          currentIndex === index
                            ? "bg-white"
                            : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <span className="text-neutral-500">No Image</span>
            )}
          </div>

          <div className="flex flex-col gap-4 justify-center">
            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <p className="text-neutral-400 text-sm">
              {product.description}
            </p>

            <p className="text-xl font-semibold">
              ₹{product.price}
            </p>

            <span
              className={`w-fit px-3 py-1 text-sm rounded ${
                product.stock > 0
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {product.stock > 0
                ? "Available"
                : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
