import { Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { useEffect } from "react";

export default function ProductCard({
    product,
    onEdit,
    onDelete,
    setSelectedProduct,
}) {
    const hasImage = product.images && product.images.length > 0;
    useEffect(() => {
        console.log(product);
    }, [product]);

    return (
        <div
            onClick={() => setSelectedProduct?.(product)}
            className="group bg-white rounded-2xl overflow-hidden cursor-pointer
                 border border-gray-200
                 shadow-sm hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300"
        >
            {/* ================= IMAGE / PLACEHOLDER ================= */}
            <div className="relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                {hasImage ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover
                       group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <ImageIcon size={44} />
                        <span className="text-xs mt-2">No Image</span>
                    </div>
                )}

                {/* ================= ACTIONS ================= */}
                <div className="absolute top-3 right-3 flex gap-2
                        opacity-0 group-hover:opacity-100 transition">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(product);
                        }}
                        className="p-2 rounded-full bg-white/80 text-blue-600
                       border border-gray-200 hover:bg-white"
                        title="Edit"
                    >
                        <Edit size={16} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(product._id);
                        }}
                        className="p-2 rounded-full bg-white/80 text-red-600
                       border border-gray-200 hover:bg-white"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="p-4 space-y-2">
                {/* PRODUCT NAME */}
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {product.name}
                </h3>

                {/* CATEGORIES */}
                <div className="flex flex-wrap gap-1">
                    {product.categories?.slice(0, 2).map((cat) => (
                        <span
                            key={cat._id || cat}
                            className="text-[10px] px-2 py-0.5 rounded-full
                         bg-gray-100 text-gray-600"
                        >
                            {cat.name || cat}
                        </span>
                    ))}
                    {product.categories?.length > 2 && (
                        <span className="text-[10px] text-gray-500">
                            +{product.categories.length - 2}
                        </span>
                    )}
                </div>

                {/* PRICE & STOCK */}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-900 font-bold text-sm">
                        ₹{product.price}
                    </span>

                    <span
                        className={`text-xs ${product.stock > 0
                            ? "text-gray-500"
                            : "text-red-500"
                            }`}
                    >
                        {product.stock > 0
                            ? `Stock: ${product.stock}`
                            : "Out of stock"}
                    </span>
                </div>
            </div>
        </div>
    );
}
