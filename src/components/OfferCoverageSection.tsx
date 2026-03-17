import { MapPin, Calendar, Truck, Shield } from "lucide-react";
import serviceTruck from "@/assets/hero-truck.png";

const features = [
  {
    icon: MapPin,
    title: "Multi-State Coverage",
    description: "Serving commercial fuel transport needs across Pennsylvania and surrounding states with a comprehensive terminal network.",
  },
  {
    icon: Calendar,
    title: "Reliable Scheduling",
    description: "Dependable delivery windows and real-time dispatch coordination to keep your operations running smoothly.",
  },
  {
    icon: Truck,
    title: "Commercial Fuel Delivery",
    description: "Bulk diesel, gasoline, and specialty fuel transport for businesses, fleets, and industrial operations.",
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Fully licensed, insured, and compliant with DOT regulations. Your fuel arrives safely, every time.",
  },
];

const OfferCoverageSection = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-orange-600 tracking-widest mb-4">
            PROFESSIONAL FUEL LOGISTICS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Dependable Fuel Transport <span className="text-orange-500">Across Multiple States</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            True Grade Transport delivers commercial fuel solutions with broad service coverage,
            reliable logistics, and a commitment to safety. Our multi-state network ensures your
            business gets the fuel it needs, when it needs it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group h-full p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors mb-4">
                  <Icon className="h-6 w-6" />
                </div>

                <h4 className="font-bold text-lg mb-3 text-slate-900">
                  {feature.title}
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Whether you need scheduled bulk deliveries or emergency fuel service,
                our team is ready to support your operations with professional,
                dependable fuel transport solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+18005551234"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="mailto:info@truegradetrransport.com"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-slate-300 hover:border-orange-500 hover:text-orange-600 font-semibold transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>

            <div className="relative h-64 md:h-auto">
              <img
                src={serviceTruck}
                alt="Fuel transport truck"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferCoverageSection;
