"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, loginUser, logoutUser } from "@/services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setError(error.message || "Error al verificar la autenticación");
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const { user, token } = await loginUser(credentials);
      setUser(user);
      localStorage.setItem("authToken", token);
      router.push("/products");
    } catch (error) {
      console.error("Error en login:", error);
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
      console.error("Error en logout:", error);
      setError(error.message || "Falla en el cierre de sesión");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
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