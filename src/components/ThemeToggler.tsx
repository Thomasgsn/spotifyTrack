import { GoMoon, GoSun } from "react-icons/go";
import { useEffect, useState } from "react";

export const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setTimeout(() => {}, 500);
  }, [darkMode]);

  return (
    <button className="bg" onClick={() => setDarkMode(!darkMode)}>
      <GoSun
        size={20}
        className="absolute"
        style={{ opacity: darkMode ? 0 : 1 }}
      />
      <GoMoon
        size={20}
        className="absolute"
        style={{ opacity: darkMode ? 1 : 0 }}
      />
    </button>
  );
};
