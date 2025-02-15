
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  FileText, 
  Quote, 
  Clock, 
  Building2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BrandCard = ({ 
  name, 
  logo = "/placeholder.svg",
  subBrands 
}: { 
  name: string;
  logo?: string;
  subBrands: string[];
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-center h-20">
          <img
            src={logo}
            alt={name}
            className="h-12 object-contain opacity-80"
          />
        </div>
        <CardTitle className="text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {subBrands.map((brand) => (
            <Button
              key={brand}
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate(`/products?brand=${encodeURIComponent(brand)}`)}
            >
              <Building2 className="w-4 h-4 mr-2" />
              {brand}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const brands = [
    {
      name: "Choice Hotels",
      subBrands: ["Comfort Inn", "Quality Inn", "EconoLodge", "Clarion"],
    },
    {
      name: "Marriott",
      subBrands: ["Courtyard", "Residence Inn", "SpringHill Suites"],
    },
    {
      name: "Hilton",
      subBrands: ["Hampton Inn", "DoubleTree", "Garden Inn"],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground">
          Select your hotel brand to view approved products
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <BrandCard
            key={brand.name}
            name={brand.name}
            subBrands={brand.subBrands}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
            <Quote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Viewed</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Guidelines Updated
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
