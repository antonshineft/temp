
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Hero Content */}
          <div className="space-y-6 animate-slideDown">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your Hospitality Technology Standards Hub
            </h1>
            <p className="text-xl text-muted-foreground">
              Access comprehensive brand standards and compliance information for hotel technology products. 
              A centralized repository for hospitality professionals to ensure brand consistency across properties.
            </p>
            <div className="space-x-4 pt-4">
              <Button
                size="lg"
                className="text-lg"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg"
                onClick={() => navigate("/register")}
              >
                Create Account
              </Button>
            </div>
          </div>

          {/* Brand Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white/50 rounded-lg animate-fadeIn">
            <img
              src="/placeholder.svg"
              alt="Marriott"
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/placeholder.svg"
              alt="Hilton"
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/placeholder.svg"
              alt="Hyatt"
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/placeholder.svg"
              alt="Best Western"
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/placeholder.svg"
              alt="Choice"
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/placeholder.svg"
              alt="Drury"
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/placeholder.svg"
              alt="Red Roof"
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/placeholder.svg"
              alt="G6"
              className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
