import { MapPin, Radio } from "lucide-react";

const DispatchMap = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-safety tracking-widest mb-4 uppercase">
            Live Coverage
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Current Dispatch Coverage
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real-time visibility into our service area and active dispatch units.
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card">
          <div className="aspect-[16/9] md:aspect-[21/9] relative">
            {/* Placeholder Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-muted">
              {/* Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(var(--safety) / 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--safety) / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              />
              
              {/* Simulated Map Points */}
              <div className="absolute top-1/4 left-1/3 animate-pulse">
                <div className="relative">
                  <MapPin className="h-8 w-8 text-safety" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping" />
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <div className="relative">
                  <MapPin className="h-8 w-8 text-safety" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping" />
                </div>
              </div>
              
              <div className="absolute top-2/3 left-2/3 animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="relative">
                  <MapPin className="h-8 w-8 text-safety" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping" />
                </div>
              </div>
            </div>

            {/* Overlay Info */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border/50">
                <Radio className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-foreground">3 Units Active</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border/50">
                <MapPin className="h-4 w-4 text-safety" />
                <span className="text-sm font-medium text-foreground">50+ Mile Radius</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Need service outside our coverage area?{" "}
            <a href="tel:+18005551234" className="text-safety hover:underline font-medium">
              Contact dispatch
            </a>
            {" "}for custom arrangements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DispatchMap;
