import apiClient from "@/lib/api";

export const getAllProducts = async (params = {}) => {
  try {
    const response = await apiClient.get("/products", { params });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch product details"
    );
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products by category"
    );
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await apiClient.get(`/products/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to search products"
    );
  }
};
