import { PluginAPI } from "tailwindcss/types/config";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
        none: "none",
      },
      colors: {
        dark: "var(--dark)",
        light: "var(--light)",
        text: {
          light: "var(--text-light)",
          dark: "var(--text-dark)",
        },
        background: {
          light: "var(--background-light)",
          dark: "var(--background-dark)",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        lato: ["var(--font-lato)"],
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [
    function (api: PluginAPI) {
      const { addUtilities, theme } = api;

      const textShadow = theme("textShadow") as Record<string, string>;
      const utilities = Object.entries(textShadow).map(([key, value]) => ({
        [`.text-shadow-${key}`]: { textShadow: value },
      }));

      addUtilities(Object.assign({}, ...utilities));
    },
  ],
} satisfies Config;
