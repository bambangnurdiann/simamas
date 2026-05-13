import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14532d",
        accent: "#b78b2b"
      }
    }
  },
  plugins: []
};

export default config;
