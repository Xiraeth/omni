import { PluginAPI } from "tailwindcss/types/config";
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 5px rgba(0, 0, 0, 0.2)",
        md: "1px 2px 6px rgba(0, 0, 0, 0.3)",
        lg: "1px 3px 7px rgba(0, 0, 0, 0.4)",
        none: "none",
      },
      colors: {
        discordBlue: "#5865F2",
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
        geistSans: ["var(--font-geist-sans)"],
        geistMono: ["var(--font-geist-mono)"],
        montserrat: ["var(--font-montserrat)"],
        roboto: ["var(--font-roboto)"],
        lato: ["var(--font-lato)"],
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
