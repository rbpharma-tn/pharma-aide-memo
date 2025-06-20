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
import AppHeader from "@/components/AppHeader";
import { MemofichePreview } from "@/components/MemofichePreview";
import { Button } from "@/components/ui/button";
import { MemoficheAIGenerator } from "@/components/MemoficheAIGenerator";

// Type for memofiches based on your supabase db
type Memofiche = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  // Add any other fields you need
};

export default function AppHome() {
  const navigate = useNavigate();
  const [memofiches, setMemofiches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat") || "all";
  const [showPreview, setShowPreview] = useState(false);
  const [showAIGen, setShowAIGen] = useState(false);

  useEffect(() => {
    let ignore = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session?.user && !ignore) {
        navigate("/auth");
      }
    });

    async function fetchMemofiches() {
      setLoading(true);
      let { data, error } = await supabase
        .from("memofiches")
        .select("*")
        .order("created_at", { ascending: false });

      // Filtrer par thème
      if (cat !== "all" && data) {
        data = data.filter((item) => item.theme === cat);
      }

      // Filtre supplémentaire pour masquer les fiches test/demo
      if (data) {
        data = data.filter(
          (item) =>
            !["test", "demo", "factice"].some((motCle) =>
              [
                item.title,
                item.subtitle,
                item.description
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(motCle)
            )
        );
      }

      setMemofiches(data ?? []);
      setLoading(false);
    }
    fetchMemofiches();
    return () => {
      ignore = true;
    };
  }, [navigate, cat]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER global toujours visible */}
      <AppHeader />
      {/* Arrange the sidebar to start below the header with a gap for a more balanced design */}
      <SidebarProvider>
        <div className="flex flex-1 min-h-0 w-full">
          {/* 
            Sidebar starts below the header.
            To do this, make sure it uses padding or margin-top at least equal to header height. 
            We'll adjust it so it's not flush with the top.
          */}
          <div className="pt-4 md:pt-6">
            <AppSidebar />
          </div>
          <SidebarInset className="flex-1 flex justify-center items-center py-8 px-2">
            <main className="w-full max-w-4xl bg-white rounded-xl shadow-lg py-10 px-6 md:px-12">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <h1 className="text-2xl font-playfair font-bold text-gray-800 flex items-center gap-2">
                  Mes mémofiches
                </h1>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="border border-blue-600 text-blue-700 bg-blue-50 hover:bg-blue-100"
                    onClick={() => setShowAIGen(true)}
                  >
                    + Générer une mémofiche IA
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview((v) => !v)}
                  >
                    {showPreview ? "Masquer l’aperçu" : "Voir un exemple"}
                  </Button>
                </div>
              </div>
              <MemoficheAIGenerator open={showAIGen} onClose={() => setShowAIGen(false)} />
              {showPreview && <MemofichePreview onClose={() => setShowPreview(false)} />}
              {loading ? (
                <div className="text-center text-gray-400 pt-12 animate-pulse">
                  Chargement…
                </div>
              ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {memofiches.length === 0 ? (
                    <div className="text-gray-400 col-span-full py-12 text-center">
                      Aucune mémofiche dans cette catégorie.
                    </div>
                  ) : (
                    memofiches.map((m) => (
                      <Card
                        key={m.id}
                        className="bg-white border border-gray-100 shadow hover:shadow-lg group transition-all rounded-xl"
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-black text-lg truncate font-semibold">
                            {m.title}
                          </CardTitle>
                          {m.subtitle && (
                            <CardDescription className="text-gray-500 text-sm">
                              {m.subtitle}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-[15px] text-gray-700 line-clamp-5 leading-snug font-normal">
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
    </div>
  );
}
