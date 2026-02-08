import { Menu } from "lucide-react";

export default function AdminNavbar({ onMenuClick }) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-black text-white flex items-center justify-between px-4 z-50">

      <h1 className="text-lg font-bold tracking-wide">Dashboard</h1>

      <button onClick={onMenuClick} className="p-2">
        <Menu size={24} />
      </button>
    </header>
  );
}
