import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Fuel } from "lucide-react";

import bulkImg from "@/assets/service-bulk.png";
import fleetImg from "@/assets/service-fleet.png";

const services = [
  {
    icon: Truck,
    title: "Bulk Transport",
    description:
      "Large-scale fuel transportation for industrial sites, construction projects, and commercial facilities. Reliable bulk delivery on your schedule.",
    image: bulkImg,
  },
  {
    icon: Fuel,
    title: "Fleet Fueling",
    description:
      "On-site refueling services for commercial fleets. Minimize downtime and keep your vehicles moving with scheduled or on-demand delivery.",
    image: fleetImg,
  },
];

const ServiceGrid = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-safety tracking-widest mb-4 uppercase">
            Our Services
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Fuel Solutions for Every Need
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From scheduled commercial deliveries to on-site fleet fueling, we have the power to keep you moving.
          </p>
        </div>

        {/* Services Grid (2 cards only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.title}
              className="overflow-hidden bg-card border-border/60 card-hover flex flex-col h-full"
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>

              <CardHeader className="pb-4">
                <div className="inline-flex items-center gap-3">
                  <div className="inline-flex p-3 rounded-xl w-fit bg-safety/10 text-safety">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <CardDescription className="text-muted-foreground text-base leading-relaxed min-h-[72px]">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
