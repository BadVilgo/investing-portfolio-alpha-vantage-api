import { useTheme } from "../hooks/useTheme";
import { toggleTheme } from "../lib/theme";

function ThemeToggle() {
  const theme = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      className="btn btn-outline-secondary btn-sm theme-toggle"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <i className={dark ? "bi bi-sun" : "bi bi-moon-stars"} aria-hidden="true"></i>
    </button>
  );
}

export default ThemeToggle;
