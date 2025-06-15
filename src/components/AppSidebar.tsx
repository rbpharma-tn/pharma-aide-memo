
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutList, Stethoscope, Pill, Leaf, Sparkles, Dog, Syringe, FlaskConical, MessageCircle } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";

// Liste des domaines d'expertises alignée au carrousel
const domaines = [
  { label: "Maladies courantes", value: "maladies-courantes", icon: <Stethoscope className="h-5 w-5" /> },
  { label: "Ordonnances", value: "ordonnances", icon: <Pill className="h-5 w-5" /> },
  { label: "Micronutrition", value: "micronutrition", icon: <Leaf className="h-5 w-5" /> },
  { label: "Dermo-cosmétique", value: "dermo-cosmetique", icon: <Sparkles className="h-5 w-5" /> },
  { label: "Pharmacie vétérinaire", value: "pharmacie-veterinaire", icon: <Dog className="h-5 w-5" /> },
  { label: "Dispositifs", value: "dispositifs", icon: <Syringe className="h-5 w-5" /> },
  { label: "Pharmacologie", value: "pharmacologie", icon: <FlaskConical className="h-5 w-5" /> },
  { label: "Communication", value: "communication", icon: <MessageCircle className="h-5 w-5" /> },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const [searchParams] = useSearchParams();
  const domaine = searchParams.get("cat") || "all";
  const isDomaineActive = (key: string) => domaine === key;

  return (
    <Sidebar
      className={
        `${state === "collapsed" ? "w-16" : "w-56"} min-h-screen border-r
        bg-gradient-to-b from-[#f7f7fa] to-[#ececf2] text-gray-900`
      }
      collapsible="icon"
    >
      <SidebarTrigger className="m-3 self-end md:hidden" />
      <SidebarContent>
        {/* Changement de label */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-gray-400 px-3 pb-1 tracking-wider mt-1 mb-2">
            Compétences
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Domaine = bouton "voir tout" */}
              <SidebarMenuItem key="all">
                <SidebarMenuButton asChild isActive={domaine === "all"}>
                  <NavLink
                    to="/app?cat=all"
                    className={
                      "flex items-center gap-2 rounded px-2 py-2 transition-colors" +
                      (domaine === "all"
                        ? " bg-white text-black font-semibold shadow-sm"
                        : " text-gray-500 hover:bg-gray-200")
                    }
                  >
                    <LayoutList className="h-5 w-5" />
                    {state === "expanded" && <span>Tout</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Boucle sur les domaines */}
              {domaines.map((dom) => (
                <SidebarMenuItem key={dom.value}>
                  <SidebarMenuButton asChild isActive={isDomaineActive(dom.value)}>
                    <NavLink
                      to={`/app?cat=${dom.value}`}
                      className={
                        "flex items-center gap-2 rounded px-2 py-2 transition-colors" +
                        (isDomaineActive(dom.value)
                          ? " bg-white text-black font-semibold shadow-sm"
                          : " text-gray-500 hover:bg-gray-200")
                      }
                    >
                      {dom.icon}
                      {state === "expanded" && <span>{dom.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem key="generateur">
                <SidebarMenuButton asChild isActive={window.location.pathname === "/generateur"}>
                  <NavLink
                    to="/generateur"
                    className={
                      "flex items-center gap-2 rounded px-2 py-2 transition-colors" +
                      (window.location.pathname === "/generateur"
                        ? " bg-blue-100 text-blue-700 font-bold shadow"
                        : " text-gray-500 hover:bg-gray-200")
                    }
                  >
                    <span>✨</span>
                    {state === "expanded" && <span>Générateur IA</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

