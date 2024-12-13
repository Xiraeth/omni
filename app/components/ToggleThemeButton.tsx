"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed z-50 top-4 right-4 dark:bg-slate-200 py-2 px-4 rounded-md transition-all duration-200 bg-slate-700 text-white dark:text-black w-14 shadow-lg shadow-black/30 dark:shadow-white/30 active:translate-y-1"
    >
      {theme === "light" ? (
        <FontAwesomeIcon size="lg" icon={faSun} className="text-white" />
      ) : (
        <FontAwesomeIcon size="lg" icon={faMoon} className="text-black" />
      )}
    </button>
  );
};
