
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users2, Wrench, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Building2,
      title: "Hotel Owners & General Managers",
      description: "Ensure that all technology purchases align with your brand's standards and deliver the best experience for your guests.",
    },
    {
      icon: Users2,
      title: "Hotel Management Groups",
      description: "Manage compliance across multiple properties more efficiently with a centralized resource for approved technology solutions.",
    },
    {
      icon: Wrench,
      title: "Building Engineers",
      description: "Access brand-compliant products for HVAC, in-room controls, and infrastructure updates to maintain hotel operations smoothly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto space-y-16">
          <section className="space-y-8">
            <h1 className="text-4xl font-bold">About HotelBrandPortal.com</h1>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Why HotelBrandPortal.com Was Created</h2>
              <p className="text-lg text-muted-foreground">
                Navigating hotel technology brand standards can be complex and time-consuming. With so many brands and sub-brands enforcing specific requirements for in-room technology, network infrastructure, and guest-facing solutions, hotel owners and management teams often struggle to find the right products that align with their property's standards. HotelBrandPortal.com was built to simplify this process.
              </p>
              <p className="text-lg text-muted-foreground">
                We created this platform to serve as a centralized, easy-to-access resource where hoteliers can quickly find brand-approved technology solutions. No more sifting through lengthy brand guidelines or reaching out to multiple vendors, our portal does the heavy lifting, making it easier for hotel professionals to make informed purchasing decisions.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">What HotelBrandPortal.com Does</h2>
            <p className="text-lg text-muted-foreground">
              HotelBrandPortal.com provides a dedicated portal where hotel industry professionals can access up-to-date brand standards for technology products across various hotel brands and sub-brands. After signing up for free, users can log in to view approved products that meet their hotel's specific requirements.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether you need hospitality TVs, high-speed internet solutions, PTAC units, guestroom automation systems, or other essential hotel technology, our portal helps you find the right options, ensuring compliance while saving time and effort.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Who Stands to Benefit?</h2>
            <p className="text-lg text-muted-foreground">
              This platform is designed to support hotel owners, general managers, hotel management groups, and building engineers who are responsible for maintaining brand compliance and upgrading hotel technology.
            </p>
            
            <div className="grid gap-6 md:grid-cols-3 mt-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <p className="text-lg text-center font-medium">
              By providing clarity, convenience, and confidence in the technology selection process, HotelBrandPortal.com helps hotel professionals stay compliant, make informed decisions, and keep their properties running seamlessly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
