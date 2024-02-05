import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,md,mdx,ts}"],
  theme: {
    colors: {
      "dark-gray": "#36393B",
      black: "#000000",
      "light-gray": "#D9D9D9",
      "light-brown": "#E1D2C0",
      "dark-green": "#3B613E",
      cream: "#F9EDDA",
      "off-white": "#F3EEE8",
    },
    extend: {
      fontFamily: {
        serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
        sans: ["'Source Sans 3'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typography()],
} satisfies Config;
