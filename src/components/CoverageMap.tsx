import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CoverageMap = () => {
  const [zipCode, setZipCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<"available" | "unavailable" | null>(null);

  const handleCheck = async () => {
    if (!zipCode || zipCode.length < 5) {
      toast({
        title: "Invalid zip code",
        description: "Please enter a valid 5-digit zip code.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    // Simulate API check
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock: zip codes starting with 1, 2, 3, 7, 8, 9 are "covered"
    const firstDigit = zipCode.charAt(0);
    const isAvailable = ["1", "2", "3", "7", "8", "9"].includes(firstDigit);
    
    setResult(isAvailable ? "available" : "unavailable");
    setIsChecking(false);
  };

  const serviceAreas = [
    "Greater Metro Area",
    "Interstate Corridors I-95, I-75, I-10",
    "Industrial Districts",
    "Rural Emergency Coverage",
    "Port & Maritime Zones",
    "Airport Service Areas",
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div>
            <h2 className="text-sm font-semibold text-primary tracking-widest mb-4">
              SERVICE AREA
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6">
              Coverage <span className="text-metallic">You Can Count On</span>
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              True Grade Transport serves major metropolitan areas and highway corridors 
              across the region. Enter your zip code to check if we can reach you.
            </p>

            {/* Service Areas List */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-foreground/80">{area}</span>
                </div>
              ))}
            </div>

            {/* Zip Code Check */}
            <Card className="bg-card border-border/50">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter zip code"
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5));
                        setResult(null);
                      }}
                      className="pl-10"
                      maxLength={5}
                    />
                  </div>
                  <Button 
                    variant="default" 
                    onClick={handleCheck}
                    disabled={isChecking || zipCode.length < 5}
                  >
                    {isChecking ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Check Availability"
                    )}
                  </Button>
                </div>

                {/* Result */}
                {result && (
                  <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                    result === "available" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {result === "available" ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <div>
                          <p className="font-semibold">Great news! We serve your area.</p>
                          <p className="text-sm opacity-80">Estimated response: 30-60 minutes</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5" />
                        <div>
                          <p className="font-semibold">Currently outside our service area.</p>
                          <p className="text-sm opacity-80">Call us for special arrangements.</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Visual Map Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted via-card to-muted border border-border/50 overflow-hidden">
              {/* Decorative Map Grid */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Pulse Points */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
                <span className="relative block w-4 h-4 rounded-full bg-primary"></span>
              </div>
              <div className="absolute top-1/2 right-1/4 w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-75" style={{ animationDelay: "0.5s" }}></span>
                <span className="relative block w-3 h-3 rounded-full bg-secondary"></span>
              </div>
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" style={{ animationDelay: "1s" }}></span>
                <span className="relative block w-3 h-3 rounded-full bg-primary"></span>
              </div>

              {/* Coverage Radius */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-2 border-primary/30 border-dashed animate-spin" style={{ animationDuration: "30s" }} />
                <div className="absolute w-32 h-32 rounded-full border-2 border-secondary/30 border-dashed animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
              </div>

              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Mile Radius Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMap;
