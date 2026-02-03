import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Truck, Home } from "lucide-react";

const services = [
  {
    icon: AlertTriangle,
    title: "Emergency Roadside Fuel",
    description: "Stranded on the road? Our rapid response team delivers fuel directly to your location within 60 minutes. Available 24/7 for gasoline and diesel vehicles.",
    features: ["60-min response time", "All fuel types", "Jump-start assistance"],
    accent: "secondary" as const,
  },
  {
    icon: Truck,
    title: "Commercial Fleet Refueling",
    description: "Keep your fleet running without downtime. Scheduled bulk deliveries directly to your depot, construction site, or facility. Volume discounts available.",
    features: ["Bulk discounts", "Scheduled deliveries", "Fuel management"],
    accent: "primary" as const,
  },
  {
    icon: Home,
    title: "Home & Generator Delivery",
    description: "Power outages don't wait, neither do we. Emergency generator fuel delivery and residential heating oil services throughout our coverage area.",
    features: ["Storm response", "Heating oil", "Propane available"],
    accent: "secondary" as const,
  },
];

const Services = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-primary tracking-widest mb-4">
            OUR SERVICES
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            Fuel Solutions for{" "}
            <span className="text-metallic">Every Situation</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From emergency roadside rescues to scheduled commercial deliveries, 
            True Grade Transport has the power to keep you moving.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="card-hover bg-card border-border/50 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`inline-flex p-3 rounded-lg mb-4 w-fit ${
                  service.accent === "secondary" 
                    ? "bg-secondary/10 text-secondary group-hover:bg-secondary/20" 
                    : "bg-primary/10 text-primary group-hover:bg-primary/20"
                } transition-colors`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl md:text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className={`h-1.5 w-1.5 rounded-full ${
                        service.accent === "secondary" ? "bg-secondary" : "bg-primary"
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
