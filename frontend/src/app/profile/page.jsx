"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function ProfilePage() {
  const { user, error, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aca me falta la llamada a la API para actualizar el perfil
      // await updateUserProfile(formData);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mi Perfil
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Gestiona tu información personal
            </p>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Información Personal
                </h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Nombre
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="mt-1 block w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="mt-1 block w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Teléfono
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="mt-1 block w-full"
                      />
                    </div>
                  </div>

                  {editMode ? (
                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditMode(false);
                          setFormData({
                            name: user?.name || "",
                            email: user?.email || "",
                            phone: user?.phone || "",
                          });
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">Guardar Cambios</Button>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => setEditMode(true)}>
                      Editar Perfil
                    </Button>
                  )}
                </form>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Configuración
                </h2>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Modo Oscuro
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Seguridad
                </h2>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Aca falta la navegación al cambio de contraseña
                    }}
                    className="w-full"
                  >
                    Cambiar Contraseña
                  </Button>
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
