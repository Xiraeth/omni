"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed z-50 top-4 right-4 dark:bg-background-light py-2 px-4 rounded-lg transition-all duration-200 bg-background-dark text-text-light dark:text-text-dark w-14 flex items-center justify-center shadow-lg shadow-black/30 dark:shadow-white/30 active:translate-y-1 text-lg hover:bg-slate-600 dark:hover:bg-zinc-200 sm:block"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        {theme === "light" ? (
          <FontAwesomeIcon icon={faSun} className="text-white w-full h-full" />
        ) : (
          <FontAwesomeIcon icon={faMoon} className="text-black w-full h-full" />
        )}
      </div>
    </button>
  );
};
