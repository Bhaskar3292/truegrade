import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import ComplianceBar from "@/components/ComplianceBar";
import BookingForm from "@/components/BookingForm";
import TrustSignals from "@/components/TrustSignals";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ComplianceBar />
        <div id="services">
          <ServiceGrid />
        </div>
        <BookingForm />
        <TrustSignals />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
