
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const hotelBrands = [
  "Marriott",
  "Hilton",
  "Hyatt",
  "Best Western",
  "Choice",
  "Drury",
  "Red Roof",
  "G6",
];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted",
      description: "Your request has been sent for approval. You will receive an email with login credentials once approved.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <Card className="w-full max-w-2xl animate-fadeIn">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Register for access to your hotel brand's technology standards portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyAddress">Property Address</Label>
              <Input id="propertyAddress" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotelBrand">Hotel Brand</Label>
              <Select>
                <SelectTrigger id="hotelBrand">
                  <SelectValue placeholder="Select hotel brand" />
                </SelectTrigger>
                <SelectContent>
                  {hotelBrands.map((brand) => (
                    <SelectItem key={brand} value={brand.toLowerCase()}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 text-sm text-muted-foreground">
              <p>Once your registration is approved, you will receive an email with instructions to set up your password.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Submit Registration
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate("/login")}
            >
              Already have an account? Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
