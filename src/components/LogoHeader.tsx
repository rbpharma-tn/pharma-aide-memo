
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export default function LogoHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-sm border-b">
      <Link to="/app" className="flex items-center gap-2">
        {/* Logo circle pilule style */}
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 shadow text-white text-xl font-bold animate-fade-in">
          💊
        </span>
        <span className="ml-2 text-2xl font-bold text-gray-800 tracking-tight font-playfair leading-tight">Mémofiche</span>
      </Link>
      {/* SidebarTrigger (mobile, mini sidebar visible) */}
      <SidebarTrigger className="md:hidden hover:bg-gray-100 rounded p-1" />
    </header>
  );
}
