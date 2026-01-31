function ProductSection({ title }) {
  return (
    <section className="px-6 md:px-16 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-sm text-gray-400 hover:text-white">
          View More →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-neutral-900 rounded-xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
              alt="product"
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-medium">Stylish Outfit</h3>
              <p className="text-xs text-green-400 mt-1">Available</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default ProductSection;