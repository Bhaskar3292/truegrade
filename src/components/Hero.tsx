import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import heroVideo from "@/assets/video.mp4";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* ===== REAL VIDEO BACKGROUND ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* energy sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-transparent to-orange-500/15" />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">

      

          {/* ===== TRUE GRADE TEXT ===== */}
          <div className="relative">
            {/* glow behind text */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,95%)] h-40 blur-3xl opacity-35 bg-gradient-to-r from-blue-600 via-cyan-400 to-orange-500" />

            <h1
              className="relative uppercase font-black leading-[0.9]
              text-[clamp(3rem,6.5vw,7rem)]
              bg-gradient-to-r from-blue-400 via-slate-200 to-orange-500
              bg-clip-text text-transparent
              drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]"
            >
              TRUE GRADE
            </h1>

            <div
              className="mt-5 uppercase font-semibold tracking-[0.45em]
              text-[clamp(1.1rem,2.4vw,2.4rem)]
              text-white/90
              drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
            >
              TRANSPORT
            </div>

            <div
              className="mt-6 uppercase font-semibold tracking-widest
              text-[clamp(0.9rem,1.6vw,1.3rem)]
              text-white/80
              drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            >
              TRUE POWER. TRUE TRUCKERS. <span>🇺🇸</span>
            </div>
          </div>

          {/* ===== CTA BUTTONS ===== */}
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="safety"
              size="xl"
              onClick={() => navigate("/booking")}
              className="shadow-xl"
            >
              Request Delivery
            </Button>

            <Button
              size="xl"
              onClick={scrollToServices}
              className="bg-white/15 text-white border border-white/60 hover:bg-white/25 hover:border-white/80 shadow-xl backdrop-blur-md"
            >
              View Services
            </Button>
          </div>

          {/* ===== TRUST BADGES ===== */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm text-white/85">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Licensed &amp; Insured
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Hazmat Certified
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              GPS Tracked Fleet
            </div>
          </div>
        </div>
      </div>

      {/* ===== SCROLL INDICATOR ===== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/60 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-white/80" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
