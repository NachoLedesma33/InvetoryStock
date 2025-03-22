"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ childern }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const userData = await getCurrentUser(token);
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const { user, token } = await loginUser(credentials);
      setUser(user);
      localStorage.setItem("authToken", token);
      router.push("/products");
    } catch (error) {
      setError(error.message || "Falla en el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("authToken");
      router.push("/");
    } catch (error) {
      setError(error.message || "Falla en el cierre de sesión");
    }
  };
  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {childern}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
