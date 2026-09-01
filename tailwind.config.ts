import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefdf3",
          100: "#d6f9e0",
          200: "#aef0c3",
          300: "#79e3a1",
          400: "#43cd7c",
          500: "#22b361",
          600: "#16924d",
          700: "#147440",
          800: "#145c36",
          900: "#124c2e",
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "Tahoma", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
