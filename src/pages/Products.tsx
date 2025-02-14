
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tv, Refrigerator, AirVent, ShieldCheck, Package2 } from "lucide-react";

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
    <CardHeader className="text-center pb-2">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-secondary rounded-full">
          <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="pt-4 border-t">
        <p className="text-sm font-medium text-muted-foreground mb-3">Approved Brands:</p>
        <ul className="mt-2 space-y-2">
          {brands.map((brand) => (
            <li key={brand} className="text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{brand}</span>
            </li>
          ))}
        </ul>
      </div>
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
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-full">
          <Package2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">Brand Standard Products</h1>
          <p className="text-muted-foreground">
            Browse our catalog of approved products for your property
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <ProductCategory key={category.title} {...category} />
        ))}
      </div>
    </div>
  );
};

export default Products;
