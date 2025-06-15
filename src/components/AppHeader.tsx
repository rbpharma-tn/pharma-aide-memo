
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AppHeader() {
  const { pathname } = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: sessionData }) => {
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        setUserRole(null);
        return;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (!error && data && data.length > 0) {
        setUserRole(data[0].role);
      } else {
        setUserRole(null);
      }
    });
  }, []);

  const navLinks = [
    { to: "/", label: "Accueil" },
    {
      to: userRole === "admin" ? "/generateur" : "/app",
      label: "Mémofiches",
    },
    { to: "/auth", label: "Connexion" },
  ];

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm z-30">
      {/* Logo PharmIA à gauche, police Playfair, noir */}
      <div className="flex items-center gap-2">
        <span className="text-3xl font-playfair font-bold text-black tracking-tight select-none">
          PharmIA
        </span>
      </div>
      {/* Menu à droite, liens underline on hover */}
      <nav className="flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.to + link.label}
            to={link.to}
            className={
              "text-base transition-colors font-medium " +
              (pathname === link.to
                ? "text-gray-900 font-bold underline underline-offset-4"
                : "text-gray-500 hover:text-black hover:underline hover:underline-offset-4")
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
