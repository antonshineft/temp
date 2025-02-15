
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Quote, ArrowLeft } from "lucide-react";

const QuoteRequest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const productId = searchParams.get('product');

  // This would typically come from an API based on the product ID
  const product = {
    id: productId,
    name: "Samsung 43\" Crystal UHD Smart TV",
    brand: "Samsung",
    category: "TVs",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Here you would typically send this to your backend
    const quoteData = {
      productId,
      quantity: formData.get('quantity'),
      notes: formData.get('notes'),
      contactName: formData.get('contactName'),
      contactEmail: formData.get('contactEmail'),
      contactPhone: formData.get('contactPhone'),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    console.log('Quote Request:', quoteData);

    // Show success message
    toast({
      title: "Quote request submitted",
      description: "We'll get back to you with pricing information shortly.",
    });

    // Navigate back to quotes list
    navigate('/quotes');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Quote className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Request Quote</h1>
          <p className="text-muted-foreground">
            {product.name}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quote Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity Needed</Label>
                <Input 
                  id="quantity" 
                  name="quantity"
                  type="number" 
                  min="1"
                  required 
                  className="max-w-[200px]"
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  placeholder="Any specific requirements or questions?"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input 
                    id="contactName" 
                    name="contactName"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail"
                    type="email" 
                    required 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input 
                  id="contactPhone" 
                  name="contactPhone"
                  type="tel" 
                  required 
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Submit Quote Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteRequest;
