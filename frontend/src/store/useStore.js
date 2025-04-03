import { create } from "zustand";

export const useStore = create((set) => ({
  isAuthenticated: false,
  darkMode: false,
  cart: [],
  products: [],
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  setProducts: (products) => set({ products }),
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
}));
