import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Brand Colors
        electric: {
          DEFAULT: "hsl(var(--electric-blue))",
          glow: "hsl(var(--electric-blue) / 0.5)",
        },
        energy: {
          DEFAULT: "hsl(var(--energy-orange))",
          glow: "hsl(var(--energy-orange) / 0.5)",
        },
        safety: {
          DEFAULT: "hsl(var(--safety-orange))",
          glow: "hsl(var(--safety-orange) / 0.5)",
        },

        industrial: "hsl(var(--industrial-black))",
        metallic: "hsl(var(--metallic-silver))",
        chrome: "hsl(var(--chrome))",
        "nav-solid": "hsl(var(--nav-solid))",

        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        electric: "0 0 30px hsl(200 100% 42% / 0.4)",
        energy: "0 0 30px hsl(13 96% 50% / 0.4)",
        "glow-electric":
          "0 0 20px hsl(200 100% 42% / 0.6), 0 0 40px hsl(200 100% 42% / 0.3)",
        "glow-energy":
          "0 0 20px hsl(13 96% 50% / 0.6), 0 0 40px hsl(13 96% 50% / 0.3)",
      },

      keyframes: {
        /* ====== 20s FAKE VIDEO EFFECT ====== */
        hero20s: {
          "0%": { transform: "scale(1.08) translate3d(0%, 0%, 0%)" },
          "25%": { transform: "scale(1.10) translate3d(-1.2%, -0.6%, 0%)" },
          "50%": { transform: "scale(1.12) translate3d(-2.4%, 0.2%, 0%)" },
          "75%": { transform: "scale(1.10) translate3d(-1.4%, 0.8%, 0%)" },
          "100%": { transform: "scale(1.08) translate3d(0%, 0%, 0%)" },
        },
        lightSweep20s: {
          "0%": { transform: "translateX(-35%)", opacity: "0" },
          "10%": { opacity: "0.25" },
          "50%": { transform: "translateX(35%)", opacity: "0.35" },
          "90%": { opacity: "0.2" },
          "100%": { transform: "translateX(65%)", opacity: "0" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%, -1%)" },
          "20%": { transform: "translate(-4%, 1%)" },
          "30%": { transform: "translate(2%, -2%)" },
          "40%": { transform: "translate(4%, 2%)" },
          "50%": { transform: "translate(-3%, 2%)" },
          "60%": { transform: "translate(-1%, -2%)" },
          "70%": { transform: "translate(3%, 1%)" },
          "80%": { transform: "translate(1%, -1%)" },
          "90%": { transform: "translate(-2%, 1%)" },
        },

        /* ====== EXISTING / UI ANIMATIONS ====== */
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },

      animation: {
        /* ====== 20s FAKE VIDEO EFFECT ====== */
        "hero-20s": "hero20s 20s ease-in-out infinite",
        "light-sweep-20s": "lightSweep20s 20s ease-in-out infinite",
        grain: "grain 6s steps(2) infinite",

        /* ====== EXISTING / UI ANIMATIONS ====== */
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-ring": "pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
