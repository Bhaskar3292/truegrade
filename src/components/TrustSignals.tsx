import { Shield, Award, MapPin, Clock, Truck, Headphones } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed fuel delivery with comprehensive liability coverage",
  },
  {
    icon: Award,
    title: "Hazmat Certified",
    description: "DOT-compliant drivers trained in hazardous materials handling",
  },
  {
    icon: MapPin,
    title: "Real-Time GPS Tracking",
    description: "Track your delivery from dispatch to arrival via live updates",
  },
  {
    icon: Truck,
    title: "Modern Fleet",
    description: "Late-model tanker trucks maintained to highest safety standards",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Experienced dispatchers available whenever you need assistance",
  },
];

const TrustSignals = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-primary tracking-widest mb-4">
            WHY TRUE GRADE
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            Built on <span className="text-secondary">Trust</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            True Power. True Truckers. we've been delivering reliability 
            when it matters most.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trustItems.map((item, index) => (
            <div 
              key={item.title}
              className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default TrustSignals;
