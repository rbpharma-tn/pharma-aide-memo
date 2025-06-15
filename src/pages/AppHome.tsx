
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function AppHome() {
  const navigate = useNavigate();
  const [memofiches, setMemofiches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat") || "all";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user) {
        navigate("/auth");
      }
    });
    async function fetchMemofiches() {
      setLoading(true);
      let query = supabase.from("memofiches").select("*").order("created_at", { ascending: false });
      if (cat !== "all") {
        // Suppose table has a "category" field
        query = query.eq("category", cat);
      }
      const { data, error } = await query;
      setMemofiches(data ?? []);
      setLoading(false);
    }
    fetchMemofiches();
  }, [navigate, cat]);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-white">
        <AppSidebar />
        <SidebarInset className="p-0 bg-white">
          <main className="max-w-5xl mx-auto py-6 px-4 md:px-8">
            <h1 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
              Mes mémofiches
            </h1>
            {loading ? (
              <div className="text-center text-gray-400 pt-12">Chargement…</div>
            ) : (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {memofiches.length === 0 ? (
                  <div className="text-gray-400 col-span-full py-12 text-center">
                    Aucune mémofiche dans cette catégorie.
                  </div>
                ) : (
                  memofiches.map((m) => (
                    <Card
                      key={m.id}
                      className="bg-white border-gray-200 shadow-sm transition hover:shadow-lg group"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-black text-lg truncate">{m.title}</CardTitle>
                        {m.subtitle && (
                          <CardDescription className="text-gray-500 text-sm">
                            {m.subtitle}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-[15px] text-gray-800 line-clamp-5 leading-snug font-normal">
                          {m.description}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </section>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
