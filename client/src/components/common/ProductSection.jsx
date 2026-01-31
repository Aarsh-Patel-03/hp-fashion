
import ProductCard from "./ProductCard";
function ProductSection({ title,products=[] }) {
  return (
    <section className="px-6 md:px-16 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-sm text-gray-400 hover:text-white">
          View More →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.products.map((item) => (
            <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
export default ProductSection;