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
  const [memofiches, setMemofiches] = useState<Memofiche[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat") || "all";

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

      // FIX: Use theme instead of category for filtering
      if (cat !== "all" && data) {
        data = data.filter((item) => item.theme === cat);
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
    <SidebarProvider>
      <div className="w-full min-h-screen bg-white flex flex-col">
        <AppHeader />
        <div className="flex flex-1 min-h-0">
          <AppSidebar />
          <SidebarInset className="flex-1 p-0">
            <main className="max-w-6xl mx-auto py-10 px-4 md:px-8">
              <h1 className="text-2xl font-playfair font-bold mb-6 text-gray-800 flex items-center gap-2">
                Mes mémofiches
              </h1>
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
      </div>
    </SidebarProvider>
  );
}
