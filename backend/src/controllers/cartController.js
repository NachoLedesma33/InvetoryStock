import { CartService } from "../services/CartServices.js";

export const cartController = {
  getCart: async (req, res, next) => {
    try {
      const userId = req.user.id; 
      const cart = await CartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      if (error.message === "Carrito no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      console.log("Error al obtener el carrito");
      next(error);
    }
  },

  addToCart: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      if (!productId) {
        return res.status(400).json({ message: "El ID del producto es requerido" });
      }

      const cart = await CartService.addToCart(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("cantidad")) {
        return res.status(400).json({ message: error.message });
      }
      console.log("Error al agregar producto al carrito");
      next(error);
    }
  },

  updateCartItem: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;
      const { quantity } = req.body;

      if (!quantity) {
        return res.status(400).json({ message: "La cantidad es requerida" });
      }

      const cart = await CartService.updateCartItem(userId, productId, quantity);
      res.status(200).json(cart);
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("cantidad")) {
        return res.status(400).json({ message: error.message });
      }
      console.log("Error al actualizar producto del carrito");
      next(error);
    }
  },

  removeFromCart: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      const cart = await CartService.removeFromCart(userId, productId);
      res.status(200).json(cart);
    } catch (error) {
      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      console.log("Error al eliminar producto del carrito");
      next(error);
    }
  },

  clearCart: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const cart = await CartService.clearCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      if (error.message === "Carrito no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      console.log("Error al vaciar el carrito");
      next(error);
    }
  }
};

export default cartController;