import { Edit, Trash2 } from "lucide-react";

export default function ProductTable({ products, onEdit, onDelete }) {
  if (!products.length) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-500">
        No products available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="px-6 py-3 text-left">Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th className="px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-6 py-4 font-medium">{p.name}</td>
              <td className="text-center">{p.category}</td>
              <td className="text-center">₹{p.price}</td>
              <td className="text-center">{p.stock}</td>
              <td className="text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs
                  ${
                    p.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="px-6 py-4 flex justify-end gap-3">
                <button onClick={() => onEdit(p)}>
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

