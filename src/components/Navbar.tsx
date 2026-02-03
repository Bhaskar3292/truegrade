import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/brand-logo.png";
import { getSession, logout } from "@/lib/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    // If we're not on the home page, navigate home first, then scroll.
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookNow = () => {
    // Always read session fresh (avoids stale value if you just logged in)
    const sessionNow = getSession();

    if (!sessionNow) {
      setIsOpen(false);
      navigate("/login", { state: { from: "/booking" } });
      return;
    }

    setIsOpen(false);
    navigate("/booking");
  };

  const session = getSession();

  const desktopLinkClass = `text-sm transition-colors ${
    isScrolled
      ? "text-foreground/70 hover:text-foreground"
      : "text-white/90 hover:text-white drop-shadow"
  }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="True Grade Transport"
              className="h-10 w-auto md:h-12 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={() => scrollToSection("services")}
              className={desktopLinkClass}
            >
              Services
            </button>

            <button
              type="button"
              onClick={handleBookNow}
              className={desktopLinkClass}
            >
              Book Now
            </button>

            {session ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className={desktopLinkClass}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className={desktopLinkClass}>
                Login
              </Link>
            )}

            <Button variant="safety" size="sm" asChild>
              <a href="tel:+18005551234">
                <Phone className="mr-2 h-4 w-4" />
                Emergency
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden p-2 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 bg-white/90 backdrop-blur-lg">
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => scrollToSection("services")}
                className="text-left py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                Services
              </button>

              <button
                type="button"
                onClick={handleBookNow}
                className="text-left py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                Book Now
              </button>

              {session ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    navigate("/");
                  }}
                  className="text-left py-2 text-foreground/70 hover:text-foreground transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-left py-2 text-foreground/70 hover:text-foreground transition-colors"
                >
                  Login
                </Link>
              )}

              <Button variant="safety" asChild className="mt-2">
                <a href="tel:+18005551234">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Emergency Dispatch
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
