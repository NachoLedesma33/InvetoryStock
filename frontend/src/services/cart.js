import apiClient from "@/lib/api";

export const getUserCart = async (userId) => {
  try {
    const response = await apiClient.get(`/carts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch cart");
  }
};

export const getCartById = async (cartId) => {
  try {
    const response = await apiClient.get(`/carts/${cartId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch cart details"
    );
  }
};

export const createCart = async (cartData) => {
  try {
    const response = await apiClient.post("/carts", cartData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create cart");
  }
};

export const updateCart = async (cartData) => {
  try {
    const response = await apiClient.put(
      `/carts/${cartData.id || ""}`,
      cartData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update cart");
  }
};

export const deleteCart = async (cartId) => {
  try {
    const response = await apiClient.delete(`/carts/${cartId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete cart");
  }
};

export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await apiClient.post(`/carts/${userId}/items`, {
      product_id: productId,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add to cart");
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await apiClient.delete(
      `/carts/${userId}/items/${productId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove from cart"
    );
  }
};

export const clearCart = async (userId) => {
  try {
    const response = await apiClient.delete(`/carts/${userId}/items`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to clear cart");
  }
};
