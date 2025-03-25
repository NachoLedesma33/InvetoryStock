import { useState, useEffect } from "react";
import { cartServices } from "@/services/cart";
import { useAuth } from "./useAuth";

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const loadCart = async () => {
    try {
      if (!user) {
        setCart(null);
        return;
      }

      const cartData = await cartServices.getUserCart(user.id);
      setCart(cartData);
    } catch (err) {
      setError(err.message);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const updatedCart = await cartServices.addToCart(
        user.id,
        productId,
        quantity
      );
      setCart(updatedCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = await cartServices.removeFromCart(user.id, productId);
      setCart(updatedCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateCartItem = async (productId, newQuantity) => {
    try {
      const updatedCart = await cartServices.updateCartItem(
        user.id,
        productId,
        newQuantity
      );
      setCart(updatedCart);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart = async () => {
    try {
      await cartServices.clearCart(user.id);
      setCart(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user?.id]);

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateCartItem,
    calculateTotal,
    clearCart,
    cartTotal: cart ? calculateTotal() : 0,
    cartItems: cart?.items || [],
  };
};
