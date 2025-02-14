
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slideDown">
          Welcome to Harmony Flow
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn">
          Your premium platform for hotel procurement and brand compliance
        </p>
        <div className="space-x-4 animate-slideUp">
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
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
