import { useState, useEffect } from 'react';
import { themeServices } from '@/services/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTheme = async () => {
    try {
      const currentTheme = await themeServices.getTheme();
      setTheme(currentTheme);
    } catch (err) {
      setError(err.message);
      setTheme('light'); 
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      await themeServices.setTheme(newTheme);
      setTheme(newTheme);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.className = theme;
    }
  }, [theme]);

  useEffect(() => {
    loadTheme();
  }, []);

  return {
    theme,
    loading,
    error,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
};