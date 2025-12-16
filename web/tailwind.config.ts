import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {},
    extend: {
      fontFamily: {
        sans: [
          '"SF Pro Display"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          "sans-serif"
        ],
        display: ['"SF Pro Display"', "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
