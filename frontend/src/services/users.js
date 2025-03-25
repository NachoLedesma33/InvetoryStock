import apiClient from "@/lib/api";

export const getUsers = async (params = {}) => {
  try {
    const response = await apiClient.get("/users", { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user details"
    );
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/users", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create user");
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

export const getUserRoles = async () => {
  try {
    const response = await apiClient.get("/users/roles");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user roles"
    );
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const response = await apiClient.put(`/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update user role"
    );
  }
};

export const getUserPermissions = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/permissions`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user permissions"
    );
  }
};

export const updateUserPermissions = async (userId, permissions) => {
  try {
    const response = await apiClient.put(`/users/${userId}/permissions`, {
      permissions,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update user permissions"
    );
  }
};
