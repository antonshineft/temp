
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Package2, 
  Quote as QuoteIcon,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API based on the ID
  const product = {
    id: "1",
    name: "Samsung 43\" Crystal UHD Smart TV",
    brand: "Samsung",
    category: "TVs",
    image: "/placeholder.svg",
    description: "4K UHD Smart TV with Crystal Processor 4K and HDR",
    specifications: [
      "43\" Display",
      "4K Resolution",
      "Smart TV Features",
      "Crystal Processor 4K",
      "HDR Support",
      "Built-in WiFi",
      "Multiple HDMI Ports"
    ],
    features: [
      "Crystal clear picture quality",
      "Smart TV capabilities",
      "Energy efficient",
      "Hotel mode compatible",
      "Commercial warranty"
    ]
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{product.brand}</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-muted-foreground mt-2">
                {product.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Specifications</h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec) => (
                      <li key={spec} className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full mt-4"
                  onClick={() => navigate(`/quotes/new?product=${product.id}`)}
                >
                  Request Quote
                  <QuoteIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
