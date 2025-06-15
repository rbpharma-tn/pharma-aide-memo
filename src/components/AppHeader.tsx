
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AppHeader() {
  const { pathname } = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer la session active puis le rôle associé
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
        const role = data[0].role;
        setUserRole(role);
      } else {
        setUserRole(null); // Standard user
      }
    });
  }, []);

  // Définir dynamiquement les liens du menu
  const navLinks = [
    { to: "/", label: "Accueil" },
    {
      to: userRole === "admin" ? "/generateur" : "/app",
      label: "Mémofiches",
    },
    { to: "/auth", label: "Connexion" },
  ];

  return (
    <header className="w-full bg-white border-b flex items-center justify-between px-6 py-4 font-inter">
      <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
        PharmIA
      </Link>
      <nav className="flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.to + link.label}
            to={link.to}
            className={
              "text-base transition-colors hover:text-black font-medium" +
              (pathname === link.to
                ? " text-gray-900 font-bold"
                : " text-gray-500")
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
