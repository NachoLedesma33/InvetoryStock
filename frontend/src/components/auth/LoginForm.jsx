"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to My E-Commerce
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Please sign in to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          type="text"
          name="username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="john.doe"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Credenciales de prueba:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div>
              Usuario: <span className="font-mono">johnd</span>
            </div>
            <div>
              Contraseña: <span className="font-mono">m38rmF$</span>
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
