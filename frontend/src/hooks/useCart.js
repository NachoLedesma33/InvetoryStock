import { useState, useEffect, useCallback } from "react";
import {
  getUserCart,
  updateCart,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  clearCart as clearCartService,
} from "@/services/cart";
import { useAuth } from "./useAuth";

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const loadCart = useCallback(async () => {
    try {
      if (!user) {
        setCart(null);
        return;
      }

      const cartData = await getUserCart(user.id);
      setCart(cartData);
    } catch (err) {
      setError(err.message);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [user, setCart, setError, setLoading]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const updatedCart = await addToCartService(user.id, productId, quantity);
      setCart(updatedCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await removeFromCartService(user.id, productId);
      setCart(updatedCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateCartItem = async (productId, newQuantity) => {
    try {
      const updatedCart = await updateCart(user.id, productId, newQuantity);
      setCart(updatedCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const calculateTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart = async () => {
    try {
      await clearCartService(user.id);
      setCart(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    loadCart();
  }, [loadCart, user]);

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user.id, loadCart, user]);

  return {
    cart,
    loading,
    error,
    loadCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    calculateTotal,
    total: calculateTotal(),
    hasItems: !!cart?.items?.length,
    isAuthenticated: !!user,
  };
};

export default useCart;
