import AppHeader from "@/components/AppHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type AuthView = "login" | "signup";

export default function Auth() {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Listen to auth, check roles & redirect if logged in
  useEffect(() => {
    // reload on auth change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Check role and redirect accordingly
        const { user } = session;
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .then(({ data, error }) => {
            const isAdmin = data?.some((r) => r.role === "admin");
            if (isAdmin) {
              navigate("/admin", { replace: true });
            } else {
              navigate("/app", { replace: true });
            }
          });
      }
    });
    // Check on mount if already logged
    supabase.auth.getSession().then(async ({ data: sessionData }) => {
      const session = sessionData.session;
      if (session?.user) {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id);

        const isAdmin = data?.some((r) => r.role === "admin");
        if (isAdmin) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/app", { replace: true });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (view === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast({ title: "Erreur lors de la connexion", description: error.message });
      }
    } else {
      // signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/auth",
        },
      });
      if (error) {
        toast({ title: "Erreur lors de l'inscription", description: error.message });
      } else {
        toast({
          title: "Vérifiez votre boîte mail",
          description: "Un lien de confirmation vous a été envoyé !"
        });
      }
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg py-12 px-8 flex flex-col items-center text-center">
          <h2 className="mb-6 text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Connexion / Inscription
          </h2>
          <form className="space-y-4" onSubmit={handleAuth}>
            <Input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Chargement..." : view === "login" ? "Se connecter" : "Créer mon compte"}
            </Button>
          </form>
          <div className="text-center mt-4">
            {view === "login" ? (
              <button className="text-sm text-blue-600 hover:underline" onClick={() => setView("signup")}>
                Pas encore de compte ? S’inscrire
              </button>
            ) : (
              <button className="text-sm text-blue-600 hover:underline" onClick={() => setView("login")}>
                Déjà inscrit ? Se connecter
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
