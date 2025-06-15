
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
import { NavLink, useLocation, useSearchParams } from "react-router-dom";

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
  const location = useLocation();
  const isCategoryActive = (key: string) => cat === key;

  return (
    <Sidebar
      className={
        "min-h-screen bg-black text-white border-r border-[#222] " +
        (state === "collapsed" ? "w-16" : "w-56")
      }
      collapsible="icon"
    >
      {/* Collapse trigger visible en mini */}
      <SidebarTrigger className="m-3 self-end" />

      <SidebarContent>
        <SidebarGroup open>
          <SidebarGroupLabel className="text-xs uppercase text-gray-400 px-3 pb-1 tracking-wider">
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
                        "flex items-center gap-2 rounded px-2 py-2" +
                        (isCategoryActive(catItem.value)
                          ? " bg-neutral-900 text-white font-medium"
                          : " text-gray-300 hover:bg-neutral-800 hover:text-white")
                      }
                    >
                      <LayoutList className="h-5 w-5" />
                      {state === "expanded" && <span>{catItem.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
