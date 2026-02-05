import { Edit, Trash2 } from "lucide-react";

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  if (!categories.length) {
    return (
      <div className="bg-white rounded-xl p-6 text-center text-gray-500">
        No categories available
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="text-left px-6 py-3">Category</th>
            <th>Status</th>
            <th className="text-right px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-t">
              <td className="px-6 py-4 font-medium">{cat.name}</td>

              <td className="text-center">
                <button
                  onClick={() => onToggleStatus(cat._id)}
                  className={`px-3 py-1 rounded-full text-xs
                  ${
                    cat.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {cat.status}
                </button>
              </td>

              <td className="px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => onEdit(cat)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(cat._id)}
                  className="text-red-600 hover:text-red-800"
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
