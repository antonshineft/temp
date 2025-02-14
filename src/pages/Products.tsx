
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tv, Refrigerator, AirVent } from "lucide-react";

const ProductCategory = ({ 
  icon: Icon, 
  title, 
  brands 
}: { 
  icon: React.ElementType;
  title: string;
  brands: string[];
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Approved Brands:</p>
      <ul className="mt-2 space-y-1">
        {brands.map((brand) => (
          <li key={brand} className="text-sm">
            • {brand}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const Products = () => {
  const categories = [
    {
      icon: Tv,
      title: "TVs",
      brands: ["Samsung", "LG", "Philips"],
    },
    {
      icon: AirVent,
      title: "PTACs/VTACs",
      brands: ["Amana", "GE"],
    },
    {
      icon: Refrigerator,
      title: "Appliances",
      brands: ["GE", "Kenyon", "Summit", "Magic Chef", "Avanti", "Absocold"],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold mb-2">Brand Standard Products</h1>
        <p className="text-muted-foreground">
          Browse our catalog of approved products for your property
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <ProductCategory key={category.title} {...category} />
        ))}
      </div>
    </div>
  );
};

export default Products;
