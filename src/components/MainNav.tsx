
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function MainNav() {
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      setLogged(!!user);
      if (!user) {
        setRole(null);
        return;
      }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (roles?.some(r => r.role === "admin")) setRole("admin");
      else setRole("apprenant");
    });
  }, [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLogged(false);
    setRole(null);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b flex items-center px-4 py-3 justify-between">
      <Link to="/" className="font-bold text-xl text-blue-700 flex gap-2 items-center">
        <span role="img" aria-label="pilule">💊</span>
        PharmIA
      </Link>
      <div className="flex items-center gap-4">
        {logged && (
          <>
            <Link to="/app" className="text-gray-700 hover:underline">Accueil</Link>
            {role === "admin" && <Link to="/admin" className="text-blue-700 hover:underline font-semibold">Admin</Link>}
            <Button size="sm" variant="outline" onClick={handleLogout}>Déconnexion</Button>
          </>
        )}
        {!logged && <Link to="/auth" className="text-blue-600 hover:underline">Connexion</Link>}
      </div>
    </nav>
  );
}
