
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
import { LayoutList } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";

const categories = [
  { label: "Tout", value: "all" },
  { label: "Médicaments", value: "medicaments" },
  { label: "Pathologies", value: "pathologies" },
  { label: "Conseils", value: "conseils" },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat") || "all";
  const isCategoryActive = (key: string) => cat === key;

  return (
    <Sidebar
      className={
        `${state === "collapsed" ? "w-16" : "w-56"} min-h-screen border-r
        bg-gradient-to-b from-[#f7f7fa] to-[#ececf2] text-gray-900`
      }
      collapsible="icon"
    >
      {/* Collapse trigger visible en mini */}
      <SidebarTrigger className="m-3 self-end md:hidden" />

      <SidebarContent>
        {/* Catégories */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-gray-400 px-3 pb-1 tracking-wider mt-1 mb-2">
            Catégories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((catItem) => (
                <SidebarMenuItem key={catItem.value}>
                  <SidebarMenuButton asChild isActive={isCategoryActive(catItem.value)}>
                    <NavLink
                      to={`/app?cat=${catItem.value}`}
                      className={
                        "flex items-center gap-2 rounded px-2 py-2 transition-colors" +
                        (isCategoryActive(catItem.value)
                          ? " bg-white text-black font-semibold shadow-sm"
                          : " text-gray-500 hover:bg-gray-200")
                      }
                    >
                      <LayoutList className="h-5 w-5" />
                      {state === "expanded" && <span>{catItem.label}</span>}
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
