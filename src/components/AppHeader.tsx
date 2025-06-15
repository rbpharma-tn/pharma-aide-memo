
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 shadow text-white text-2xl font-bold group-hover:scale-105 transition-transform">
          💊
        </span>
        <span className="ml-2 text-3xl font-playfair font-bold text-gray-800 tracking-tight leading-tight group-hover:text-blue-700 transition-colors">
          PharmIA
        </span>
      </Link>
      {/* Mobile: bouton sidebar si nécessaire */}
      <SidebarTrigger className="md:hidden hover:bg-gray-100 rounded p-1" />
    </header>
  );
}
