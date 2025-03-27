"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserCart, updateCart } from "@/services/cart";
import { useAuth } from "@/hooks/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCart({ products: [] });
        return;
      }

      setLoading(true);
      try {
        const userCart = await getUserCart(user.id);
        setCart(userCart || { products: [] });
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) return;

    setLoading(true);
    try {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.id === product.id
      );

      let updatedProducts;

      if (existingProductIndex >= 0) {
        updatedProducts = [...cart.products];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity:
            (updatedProducts[existingProductIndex].quantity || 1) + quantity,
        };
      } else {
        updatedProducts = [...cart.products, { ...product, quantity }];
      }

      const updatedCart = {
        userId: user.id,
        products: updatedProducts,
      };

      // Update cart in backend
      await updateCart(updatedCart);

      // Update local state
      setCart(updatedCart);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    setLoading(true);
    try {
      const updatedProducts = cart.products.filter(
        (item) => item.id !== productId
      );

      const updatedCart = {
        userId: user.id,
        products: updatedProducts,
      };

      await updateCart(updatedCart);

      setCart(updatedCart);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user || quantity < 1) return;

    setLoading(true);
    try {
      const updatedProducts = cart.products.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      const updatedCart = {
        userId: user.id,
        products: updatedProducts,
      };

      // Update cart in backend
      await updateCart(updatedCart);

      // Update local state
      setCart(updatedCart);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const emptyCart = {
        userId: user.id,
        products: [],
      };
      
      await updateCart(emptyCart);

      setCart(emptyCart);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
