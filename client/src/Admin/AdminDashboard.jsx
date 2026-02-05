import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-h-screen bg-gray-100">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="pt-14 md:pt-0 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
