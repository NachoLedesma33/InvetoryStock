import { Cart, CartItem } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import axios from "axios";

export class CartService {
  static async fetchCarts() {
    try {
      const response = await axios.get(process.env.CARTS_API_URL);
      const carts = response.data;

      for (const cartData of carts) {
        const [cart] = await Cart.findOrCreate({
          where: { id: cartData.id },
          defaults: { userId: cartData.userId }
        });
        if (cartData.products && Array.isArray(cartData.products)) {
          for (const product of cartData.products) {
            const [cartItem] = await CartItem.findOrCreate({
              where: { cartId: cart.id, productId: product.id },
              defaults: { quantity: product.quantity || 1 }
            });
          }
        }
      }

      console.log("✅ Carritos cargados desde la API");
      return carts;
    } catch (error) {
      console.log("❌ Error al cargar los carritos desde la API");
      throw error;
    }
  }
  static async getCart(userId) {
    try {
      const cart = await Cart.findOne({
        where: { userId },
        include: [{
          model: Product,
          through: {
            model: CartItem,
            attributes: ['quantity']
          },
          attributes: ['id', 'title', 'price', 'description', 'category', 'image']
        }]
      });

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const items = cart.Products.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        quantity: product.CartItem.quantity
      }));

      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        id: cart.id,
        userId: cart.userId,
        items,
        total,
        itemCount: items.length
      };
    } catch (error) {
      console.log("❌ Error al obtener el carrito");
      throw error;
    }
  }

  static async addToCart(userId, productId, quantity = 1) {
    try {
      if (quantity <= 0) {
        throw new Error("La cantidad debe ser mayor a 0");
      }

      const [cart] = await Cart.findOrCreate({
        where: { userId }
      });

      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Producto no encontrado");
      }

      const [cartItem, created] = await CartItem.findOrCreate({
        where: { cartId: cart.id, productId },
        defaults: { quantity }
      });

      if (!created) {
        await cartItem.update({
          quantity: cartItem.quantity + quantity
        });
      }

      return await this.getCart(userId);
    } catch (error) {
      console.log("❌ Error al agregar producto al carrito");
      throw error;
    }
  }

  static async updateCartItem(userId, productId, quantity) {
    try {
      if (quantity <= 0) {
        throw new Error("La cantidad debe ser mayor a 0");
      }

      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId }
      });

      if (!cartItem) {
        throw new Error("Producto no encontrado en el carrito");
      }

      await cartItem.update({ quantity });
      return await this.getCart(userId);
    } catch (error) {
      console.log("❌ Error al actualizar producto del carrito");
      throw error;
    }
  }

  static async removeFromCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId }
      });

      if (!cartItem) {
        throw new Error("Producto no encontrado en el carrito");
      }

      await cartItem.destroy();
      return await this.getCart(userId);
    } catch (error) {
      console.log("❌ Error al eliminar producto del carrito");
      throw error;
    }
  }

  static async clearCart(userId) {
    try {
      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      await CartItem.destroy({
        where: { cartId: cart.id }
      });

      return {
        id: cart.id,
        userId: cart.userId,
        items: [],
        total: 0,
        itemCount: 0
      };
    } catch (error) {
      console.log("❌ Error al vaciar el carrito");
      throw error;
    }
  }
}