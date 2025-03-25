import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authServices } from "@/services/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const userData = await authServices.getCurrentUser();
      setUser(userData);
    } catch (err) {
      setUser(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const userData = await authServices.login(credentials);
      setUser(userData);
      router.push("/dashboard");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await authServices.logout();
      setUser(null);
      router.push("/login");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const user = await authServices.register(userData);
      setUser(user);
      router.push("/dashboard");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
};
