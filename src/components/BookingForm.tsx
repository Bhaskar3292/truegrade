import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { MapPin, Fuel, Gauge, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getSession } from "@/lib/auth";

const BookingForm = () => {
  const session = getSession();
  const [step, setStep] = useState(1);
  const [fuelType, setFuelType] = useState("diesel");
  const [quantity, setQuantity] = useState([50]);
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsLocating(false);
          toast({
            title: "Location detected",
            description: "Your GPS coordinates have been captured.",
          });
        },
        (error) => {
          setIsLocating(false);
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLocating(false);
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(4);
    toast({
      title: "Request submitted!",
      description: "Our dispatch team will contact you within 5 minutes.",
    });
  };

  const steps = [
    { number: 1, title: "Fuel Type", icon: Fuel },
    { number: 2, title: "Quantity", icon: Gauge },
    { number: 3, title: "Location", icon: MapPin },
  ];

  return (
    <section id="booking" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-secondary tracking-widest mb-4">
            BOOK NOW
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            Request <span className="text-secondary">Fuel Delivery</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Quick, easy booking for emergency or scheduled deliveries. 
            Our dispatch team responds within minutes.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-card border-border/50">
          <CardHeader>
            {/* Progress Steps */}
            <div className="flex justify-between mb-6">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    step > s.number 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : step === s.number 
                        ? "border-secondary text-secondary animate-pulse-glow" 
                        : "border-border text-muted-foreground"
                  }`}>
                    {step > s.number ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <s.icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 md:w-24 h-0.5 mx-2 transition-colors ${
                      step > s.number ? "bg-primary" : "bg-border"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <CardTitle className="text-xl">
              {step === 4 ? "Delivery Requested!" : steps[step - 1]?.title || "Complete"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Select the type of fuel you need"}
              {step === 2 && "How many gallons do you need?"}
              {step === 3 && "Where should we deliver?"}
              {step === 4 && "Your request has been submitted successfully"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!session && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/15 text-secondary mb-6">
                  <Fuel className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">Login required</h4>
                <p className="text-muted-foreground mb-6">
                  Please sign in (or create an account) to place a fuel delivery order.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="safety" asChild size="xl">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="outline" asChild size="xl">
                    <Link to="/signup">Create Account</Link>
                  </Button>
                </div>
              </div>
            )}

            {session && (
              <>
            {/* Step 1: Fuel Type */}
            {step === 1 && (
              <div className="space-y-6">
                <RadioGroup value={fuelType} onValueChange={setFuelType} className="grid grid-cols-2 gap-4">
                  <Label
                    htmlFor="diesel"
                    className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      fuelType === "diesel" 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="diesel" id="diesel" className="sr-only" />
                    <Fuel className="h-8 w-8 mb-2 text-primary" />
                    <span className="font-semibold">Diesel</span>
                    <span className="text-sm text-muted-foreground">ULSD #2</span>
                  </Label>
                  <Label
                    htmlFor="gasoline"
                    className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      fuelType === "gasoline" 
                        ? "border-secondary bg-secondary/10" 
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <RadioGroupItem value="gasoline" id="gasoline" className="sr-only" />
                    <Fuel className="h-8 w-8 mb-2 text-secondary" />
                    <span className="font-semibold">Gasoline</span>
                    <span className="text-sm text-muted-foreground">87-93 Octane</span>
                  </Label>
                </RadioGroup>
                <Button variant="emergency" className="w-full" onClick={() => setStep(2)}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Quantity */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Quantity</Label>
                    <span className="text-2xl font-bold text-primary">{quantity[0]} gal</span>
                  </div>
                  <Slider
                    value={quantity}
                    onValueChange={setQuantity}
                    max={500}
                    min={10}
                    step={10}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>10 gal</span>
                    <span>250 gal</span>
                    <span>500 gal</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="emergency" className="flex-1" onClick={() => setStep(3)}>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Delivery Address or Coordinates</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        placeholder="Enter address or use GPS"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleGetLocation}
                        disabled={isLocating}
                      >
                        {isLocating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MapPin className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    variant="emergency" 
                    className="flex-1" 
                    onClick={handleSubmit}
                    disabled={!location || !phone || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">Request Received!</h4>
                <p className="text-muted-foreground mb-6">
                  {quantity[0]} gallons of {fuelType} to be delivered to your location.
                  Our dispatch team will call you at {phone} within 5 minutes.
                </p>
                <Button variant="outline" onClick={() => { setStep(1); setLocation(""); setPhone(""); }}>
                  Submit Another Request
                </Button>
              </div>
            )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;
