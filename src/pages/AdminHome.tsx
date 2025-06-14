
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AdminHome() {
  const navigate = useNavigate();
  const [memofiches, setMemofiches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user) {
        navigate("/auth");
        return;
      }
      // Check role
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      const isAdmin = roles?.some((r) => r.role === "admin");
      if (!isAdmin) {
        navigate("/app");
        return;
      }
    });
    async function fetchMemofiches() {
      setLoading(true);
      const { data, error } = await supabase.from("memofiches").select("*").order("created_at", { ascending: false });
      setMemofiches(data ?? []);
      setLoading(false);
    }
    fetchMemofiches();
  }, [navigate]);

  if (loading) return <div className="p-8 text-center">Chargement des mémofiches…</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interface administrateur</h1>
      <p className="mb-8 text-gray-600">Gestion avancée des mémofiches à venir…</p>
      <ul className="space-y-4">
        {memofiches.length === 0 && (
          <li className="p-4 text-gray-500">Aucune mémofiche disponible.</li>
        )}
        {memofiches.map((m) => (
          <li key={m.id} className="bg-white rounded shadow border px-4 py-3">
            <div className="font-bold">{m.title}</div>
            {m.subtitle && <div className="text-gray-600 text-sm">{m.subtitle}</div>}
            {m.description && <div className="mt-2 text-gray-700">{m.description}</div>}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">
          Générer une nouvelle mémofiche (admin)
        </button>
      </div>
    </main>
  );
}
