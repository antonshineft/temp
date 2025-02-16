
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Quote,
  Settings,
  LogOut,
  Building2,
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
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navigationItems = [
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
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const brandData = {
  "Marriott": {
    name: "Marriott",
    subBrands: ["Courtyard", "Residence Inn", "SpringHill Suites"],
  },
  "Choice Hotels": {
    name: "Choice Hotels",
    subBrands: ["Comfort Inn", "Quality Inn", "EconoLodge", "Clarion"],
  },
  "Hilton": {
    name: "Hilton",
    subBrands: ["Hampton Inn", "DoubleTree", "Garden Inn"],
  },
};

export function AppSidebar() {
  const navigate = useNavigate();
  const userHotelChain = "Marriott"; // This would come from auth context
  const selectedBrand = brandData[userHotelChain];

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
              {navigationItems.map((item) => (
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

        <SidebarGroup>
          <SidebarGroupLabel>{selectedBrand.name} Properties</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {selectedBrand.subBrands.map((subBrand) => (
                <SidebarMenuItem key={subBrand}>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate(`/products?brand=${encodeURIComponent(subBrand)}`)}
                    >
                      <Building2 className="w-5 h-5 mr-3" />
                      <span>{subBrand}</span>
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
    </Sidebar>
  );
}
