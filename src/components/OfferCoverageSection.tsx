import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const terminals = [
  {
    name: "Philadelphia Terminal",
    address: "5201 Essington Ave, Philadelphia, PA 19153",
  },
  {
    name: "Pittsburgh Terminal",
    address: "1550 Beaver Ave, Pittsburgh, PA 15233",
  },
  {
    name: "Harrisburg Terminal",
    address: "3300 N 6th St, Harrisburg, PA 17110",
  },
  {
    name: "Allentown Terminal",
    address: "1802 Hanover Ave, Allentown, PA 18109",
  },
  {
    name: "Scranton Terminal",
    address: "1000 S Keyser Ave, Scranton, PA 18504",
  },
  {
    name: "Erie Terminal",
    address: "2620 W 12th St, Erie, PA 16505",
  },
  {
    name: "Wilkes-Barre Terminal",
    address: "45 New Commerce Blvd, Wilkes-Barre, PA 18706",
  },
];

const OfferCoverageSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm md:text-base shadow-lg">
            FLAT $250 FOR DELIVERY (FREIGHT) WITHIN 60 MILES OF OUR TERMINALS
          </div>
        </div>

        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-orange-600 tracking-widest mb-4">
            SPECIAL OFFER
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            FLAT $250 DELIVERY <span className="text-orange-500">(FREIGHT)</span>
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            Within 60 miles of our terminals
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Available for qualifying deliveries within 60 miles of our listed terminals.
            This flat freight rate keeps your costs predictable and transparent.
            <span className="font-semibold"> Fuel product pricing may vary; freight is flat under this offer.</span>
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10">Terminal Coverage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {terminals.map((terminal, index) => (
              <div
                key={index}
                className="group h-full p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors mb-4">
                  <MapPin className="h-6 w-6" />
                </div>

                <h4 className="font-bold text-lg mb-3 text-slate-900">
                  {terminal.name}
                </h4>

                <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                  {terminal.address}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
                  Coverage: 60-mile radius
                </div>

                <button className="text-sm text-orange-600 font-semibold hover:text-orange-700 hover:underline transition-colors">
                  Get Directions →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Check Eligibility</h3>
              <p className="text-slate-600">
                Not sure if you're within 60 miles? Send your address and we'll confirm.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                onClick={() => navigate("/booking")}
              >
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 hover:border-orange-500 hover:text-orange-600"
                onClick={() => window.location.href = "mailto:info@truegradetrransport.com?subject=Coverage Inquiry"}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferCoverageSection;
