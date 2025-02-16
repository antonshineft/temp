
import { useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Package2, ExternalLink, Quote as QuoteIcon } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  specifications: string[];
}

const ProductCard = ({ product }: { product: Product }) => (
  <Card className="hover:shadow-lg transition-shadow group">
    <CardHeader className="pb-0">
      <div className="aspect-[4/3] relative mb-4 overflow-hidden rounded-lg">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>{product.brand}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={() => window.location.href = `/products/${product.id}`}>
            View Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => window.location.href = `/quotes/new?product=${product.id}`}>
            <QuoteIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Products = () => {
  const [searchParams] = useSearchParams();
  const selectedBrand = searchParams.get('brand');
  const selectedCategory = searchParams.get('category');

  // This would typically come from your backend
  const products: Product[] = [
    {
      id: "1",
      name: "Samsung 43\" Crystal UHD Smart TV",
      brand: "Samsung",
      category: "TVs",
      image: "/placeholder.svg",
      description: "4K UHD Smart TV with Crystal Processor 4K and HDR",
      specifications: ["43\" Display", "4K Resolution", "Smart TV Features"],
    },
    {
      id: "2",
      name: "LG 50\" 4K UHD Smart TV",
      brand: "LG",
      category: "TVs",
      image: "/placeholder.svg",
      description: "4K UHD Smart TV with AI ThinQ and Magic Remote",
      specifications: ["50\" Display", "4K Resolution", "WebOS"],
    },
    {
      id: "3",
      name: "Amana PTAC Standard",
      brand: "Amana",
      category: "PTACs/VTACs",
      image: "/placeholder.svg",
      description: "Standard PTAC unit with digital controls",
      specifications: ["12,000 BTU", "Digital Controls", "Electric Heat"],
    },
    {
      id: "4",
      name: "GE Appliances PTAC Premium",
      brand: "GE",
      category: "PTACs/VTACs",
      image: "/placeholder.svg",
      description: "Premium PTAC unit with remote thermostat",
      specifications: ["15,000 BTU", "Remote Thermostat", "Heat Pump"],
    },
    {
      id: "5",
      name: "GE Top-Freezer Refrigerator",
      brand: "GE",
      category: "Appliances",
      image: "/placeholder.svg",
      description: "Energy Star certified top-freezer refrigerator",
      specifications: ["18.2 cu. ft.", "Energy Star", "LED Lighting"],
    },
    {
      id: "6",
      name: "Summit Commercial Refrigerator",
      brand: "Summit",
      category: "Appliances",
      image: "/placeholder.svg",
      description: "Commercial grade refrigerator for hospitality",
      specifications: ["24.0 cu. ft.", "Commercial Grade", "Digital Controls"],
    },
  ];

  const categories = [...new Set(products.map(p => p.category))];

  // Filter products based on selected brand and category
  const filteredProducts = products.filter(p => 
    (!selectedBrand || p.brand === selectedBrand) &&
    (!selectedCategory || p.category === selectedCategory)
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Package2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {selectedBrand ? `${selectedBrand} Products` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            Browse our catalog of approved products for your property
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('category');
            window.history.pushState({}, '', `?${newParams}`);
          }}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('category', category);
              window.history.pushState({}, '', `?${newParams}`);
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
