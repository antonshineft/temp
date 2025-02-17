
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Users2,
  Wrench,
  Bell,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Building2,
      title: "For Hotel Owners & Managers",
      description: "Ensure your property meets brand-approved technology standards with ease.",
    },
    {
      icon: Users2,
      title: "For Hotel Management Groups",
      description: "Access a centralized platform to streamline compliance across multiple properties.",
    },
    {
      icon: Wrench,
      title: "For Building Engineers",
      description: "Find the right technology solutions to keep your hotel's infrastructure up to standard.",
    },
    {
      icon: Bell,
      title: "Stay Up to Date",
      description: "Get the latest updates on brand-mandated products and emerging technology.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
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

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Hotel Technology"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Logo Slider */}
      <div className="bg-white/5 py-12">
        <div className="container mx-auto px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/4 lg:basis-1/6">
                  <div className="p-4">
                    <img
                      src="/placeholder.svg"
                      alt={`Hotel Brand ${index + 1}`}
                      className="h-12 w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-lg text-muted-foreground">
            HotelBrandPortal.com is your go-to resource for navigating hotel technology brand standards. Whether you're a hotel owner, manager, part of a management group, or a building engineer, we provide exclusive access to brand-approved technology solutions tailored to your hotel's specific requirements.
          </p>
          <p className="text-lg text-muted-foreground">
            Sign up for free, and you'll gain entry to our hotel brands portal, where you can quickly find and compare approved technology products. This ensures compliance with your hotel's brand standards. From in-room entertainment and Wi-Fi solutions to PTACs / ACs and guestroom technology, everything you need is in one place.
          </p>
          <p className="text-lg font-semibold">
            Simplify your search. Stay brand-compliant. Upgrade with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p className="text-muted-foreground">
                Have questions about brand standards or need assistance navigating HotelBrandsPortal.com? We're here to help!
              </p>
              <p className="text-muted-foreground">
                Whether you're a hotel owner, manager, management group member, or building engineer, our team is ready to provide support and ensure you get the information you need.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>support@hotelbrands.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>1-800-HOTEL-TECH</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>123 Hotel Street, Suite 100, City, State 12345</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form below, and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        placeholder="Your name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        placeholder="Your message"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
