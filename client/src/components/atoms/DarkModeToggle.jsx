import { memo } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const DarkModeToggle = memo(({ className = "" }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
        isDarkMode ? "bg-gray-700" : "bg-gray-300"
      } ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
    >
      {/* Toggle Circle */}
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          isDarkMode ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDarkMode ? (
          <MdDarkMode className="w-4 h-4 text-gray-700" />
        ) : (
          <MdLightMode className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
});

DarkModeToggle.displayName = "DarkModeToggle";

export default DarkModeToggle;