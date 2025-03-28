import { useState, useEffect } from "react";
import { getTheme, setTheme } from "@/services/theme";

export const useTheme = () => {
  const [theme, setThemeState] = useState(getTheme());

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  useEffect(() => {
    const storedTheme = getTheme();
    setThemeState(storedTheme);
  }, []);

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;