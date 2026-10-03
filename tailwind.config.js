/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        cyanAccent: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        emeraldAccent: {
          400: "#34d399",
          500: "#10b981",
        },
        amberAccent: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        roseAccent: {
          400: "#fb7185",
          500: "#f43f5e",
        },
        surface: {
          DEFAULT: "rgba(15, 23, 42, 0.65)",
          hover: "rgba(30, 41, 59, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
          glass: "rgba(255, 255, 255, 0.03)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: 1, filter: "drop-shadow(0 0 15px rgba(99, 102, 241, 0.6))" },
          "50%": { opacity: 0.7, filter: "drop-shadow(0 0 5px rgba(99, 102, 241, 0.2))" },
        },
        wave: {
          "0%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1.2)" },
          "100%": { transform: "scaleY(0.4)" }
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: 0.6 },
          "50%": { transform: "scale(1.4)", opacity: 0.95 },
        }
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s infinite ease-in-out",
        "wave-bar": "wave 1.2s infinite ease-in-out",
        "breathe-circle": "breathe 8s infinite ease-in-out",
      }
    },
  },
  plugins: [],
};
