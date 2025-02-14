
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Quote,
  LogOut,
} from "lucide-react";
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
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Guidelines",
    url: "/guidelines",
    icon: FileText,
  },
  {
    title: "Quotes",
    url: "/quotes",
    icon: Quote,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar className="border-r">
      <SidebarContent className="flex flex-col h-full">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold">Harmony Flow</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate(item.url)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarContent>
      <SidebarTrigger />
    </Sidebar>
  );
}
