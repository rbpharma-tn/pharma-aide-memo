
import AppHeader from "@/components/AppHeader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import * as React from "react";

export default function AdminHome() {
  const { data: memofiches, isLoading } = useQuery({
    queryKey: ["admin-memofiches"],
    queryFn: async () => {
      const { data, error } = await supabase.from("memofiches").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg py-8 px-4 md:py-14 md:px-8 flex flex-col items-center text-center">
          <span className="mb-3 text-xl md:text-2xl text-gray-500 font-medium">
            Espace Admin
          </span>
          <h2 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Gestion des mémofiches
          </h2>
          <div className="mb-6 text-base text-gray-600">
            Interface administrateur pour gérer les mémofiches et les utilisateurs.
          </div>

          {isLoading && (
            <div className="text-gray-400 italic">Chargement des mémofiches…</div>
          )}

          {/* Liste des mémofiches avec boutons éditer/supprimer */}
          <div className="w-full overflow-x-auto mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Niveau</TableHead>
                  <TableHead>Thème</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(memofiches ?? []).map((fiche: any) => (
                  <TableRow key={fiche.id}>
                    <TableCell className="font-semibold">{fiche.title}</TableCell>
                    <TableCell>{fiche.level}</TableCell>
                    <TableCell>{fiche.theme}</TableCell>
                    <TableCell className="flex gap-2 justify-end py-2">
                      <Button variant="outline" size="icon" title="Éditer la mémofiche">
                        <Edit className="w-4 h-4" />
                        <span className="sr-only">Éditer</span>
                      </Button>
                      <Button variant="destructive" size="icon" title="Supprimer la mémofiche">
                        <Trash className="w-4 h-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {memofiches?.length === 0 && !isLoading && (
              <div className="text-gray-500 italic mt-6">Aucune mémofiche à afficher.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
