import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary/20 via-muted to-secondary/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Fuel <span className="text-secondary">Right Now?</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            Our dispatch team is standing by to get you back on the road.
          </p>
          <Button variant="emergency" size="xl" asChild>
            <a href="tel:+18005551234">
              <Phone className="mr-2 h-5 w-5" />
              Call 1-800-555-1234
            </a>
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h4 className="text-2xl font-black text-primary mb-2">TRUE GRADE</h4>
            <p className="text-sm text-muted-foreground mb-4">
              True Power. True Truckers.
            </p>
            <p className="text-sm text-muted-foreground">
              Professional fuel delivery services for  
              commercial fleets, and residential needs across the greater metro area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">On-Demand Fuel Delivery</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Fleet Refueling</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Generator Delivery</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bulk Orders</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold mb-4">Contact</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+18005551234" className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors">
                  <Phone className="h-4 w-4" />
                  1-800-555-1234
                </a>
              </li>
              <li>
                <a href="mailto:dispatch@truegradegas.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  dispatch@truegradegas.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>123 Industrial Blvd<br />Metro City, ST 12345</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} True Grade Transport. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
