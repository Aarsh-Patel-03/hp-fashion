import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  onEdit,
  onDelete,
  setSelectedProduct,
}) {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-500">
        No products available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          setSelectedProduct={setSelectedProduct}
        />
      ))}
    </div>
  );
}
