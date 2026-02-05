import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Users,
  Layers,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { title: "Products", icon: Shirt, path: "/admin/products" },
  { title: "Categories", icon: Layers, path: "/admin/categories" },
  { title: "Orders", icon: ShoppingBag, path: "/admin/orders" },
  { title: "Customers", icon: Users, path: "/admin/customers" },
  { title: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-black text-white flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            HP <span className="text-pink-500">Fashion</span>
          </h1>

          {/* Close button (mobile) */}
          <button className="md:hidden" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map(({ title, icon: Icon, path }) => (
            <NavLink
              key={title}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  isActive
                    ? "bg-pink-500 text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
