
export default function ProductCard({product,setSelectedProduct}) {

  return (
    <div
            key={product.id}
            className="bg-neutral-900 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-medium">{product.title}</h3>
              <p className="text-xs text-green-400 mt-1">{product.status}</p>
            </div>
          </div>
  );
}