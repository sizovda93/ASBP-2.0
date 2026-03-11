import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "aspb-bg": "#07100e",
        "aspb-card": "#0c1815",
        "aspb-border": "rgba(46, 184, 122, 0.12)",
        "aspb-accent": "#2eb87a",
        "aspb-accent-dark": "#1a7a4a",
        "aspb-text": "#ffffff",
        "aspb-muted": "#90a19d",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
