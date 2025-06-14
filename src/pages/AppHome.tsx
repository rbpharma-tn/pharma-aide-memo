
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AppHome() {
  const navigate = useNavigate();
  const [memofiches, setMemofiches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) {
        navigate("/auth");
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
      <h1 className="text-2xl font-bold mb-4">📚 Mes mémofiches</h1>
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
    </main>
  );
}
