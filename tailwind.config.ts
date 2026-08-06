import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        charcoal: "#111111",
        surface: "#161616",
        gold: {
          DEFAULT: "#D4A853",
          light: "#E8C97A",
          dark: "#A8802F",
        },
        electric: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
        },
        offwhite: "#FFFFFF",
        muted: "#A0A0A0",
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "hero-mobile": ["3rem", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "hero-desktop": ["7.5rem", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "gold-fade": "linear-gradient(90deg, rgba(212,168,83,0) 0%, rgba(212,168,83,0.6) 50%, rgba(212,168,83,0) 100%)",
        "vignette": "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        grain: "grain 8s steps(10) infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};
export default config;
