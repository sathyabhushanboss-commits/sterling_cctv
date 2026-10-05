import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#9F055D",   // primary magenta - top bar / footer
          dark: "#7A0448",      // bottom bar / hover
          text: "#C2186E",      // heading / accent pink text
        },
        accent: {
          DEFAULT: "#F8CF05",   // request-a-quote yellow
          dark: "#E0BB00",
        },
        muted: "#FFF6FE",       // "Why Choose Us" section background
        ink: "#212529",
        inklight: "#dfdfdf",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        btn: "5px",
        block: "0.25rem",
      },
      maxWidth: {
        container: "1140px",
      },
    },
  },
  plugins: [],
};
export default config;
