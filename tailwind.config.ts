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
        primary: "#00FF88", // Verde brillante
        secondary: "#00CC66", // Verde medio
        dark: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#1a1a1a",
          700: "#252525",
        },
        gray: {
          100: "#FFFFFF",
          200: "#E5E5E5",
          300: "#A0A0A0",
          400: "#808080",
          500: "#666666",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #0D2818 0%, #50C878 100%)", // Fondo: verde oscuro a esmeralda
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(180deg, #0D2818 0%, #0a0a0a 100%)", // Hero: verde oscuro a negro
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(0, 255, 136, 0.3)",
        "glow-md": "0 0 20px rgba(0, 255, 136, 0.4)",
        "glow-lg": "0 0 30px rgba(0, 255, 136, 0.5)",
        "glow-xl": "0 0 40px rgba(0, 255, 136, 0.6)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 136, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
