import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminLoginModal from "./AdminLoginModal";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      {/* Show login modal first */}
      {!isAdmin && (
        <AdminLoginModal onSuccess={() => setIsAdmin(true)} />
      )}

      {/* Show admin UI only after login */}
      {isAdmin && (
        <div className="min-h-screen flex bg-gray-100">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="flex-1 flex flex-col">
            <header className="h-16 bg-white border-b flex items-center px-4 md:px-6 justify-between">
              <h1 className="text-xl font-bold">
                HP <span className="text-pink-500">Fashion</span>
              </h1>

              <button
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
            </header>

            <main className="flex-1 p-4 md:p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
}
