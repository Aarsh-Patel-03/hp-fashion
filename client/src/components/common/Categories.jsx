function Categories() {
  const categories = ["Men", "Women", "Kids", "Accessories"];

  return (
    <section className="px-6 md:px-16 py-8">
      <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            className="h-32 bg-neutral-900 flex items-center justify-center rounded-xl cursor-pointer hover:bg-neutral-800 transition"
          >
            <span className="text-lg font-medium">{cat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Categories;