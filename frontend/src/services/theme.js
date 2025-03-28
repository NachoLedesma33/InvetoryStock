export const getTheme = () => {
  try {
    return JSON.parse(localStorage.getItem("theme")) || "light";
  } catch {
    return "light";
  }
};

export const setTheme = (theme) => {
  try {
    localStorage.setItem("theme", JSON.stringify(theme));
    return true;
  } catch {
    return false;
  }
};
