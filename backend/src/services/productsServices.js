import axios from "axios";
import { Product } from "../models/Product.js";

export class ProductServices {
  static async fetchProducts() {
    try {
      const response = await axios.get(process.env.API_URL);
      const procducts = response.data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
      }));
      await Product.bulkCreate(procducts, { ignoreDuplicates: true });
      console.log("✅ Productos cargados en la base de datos.");
    } catch (error) {
      console.log(
        "❌ No se pudieron cargar los productos en la base de datos.",
        error.message
      );
      console.log(error);
    }
  }

  static async getPruduts() {
    return await Product.findAll();
  }
  static async getProductById(id) {
    return await Product.findByPk(id);
  }

  static async createProduct(product) {
    return await Product.create(product);
  }
  static async updateProductById(id, productData) {
    const pruduct = await Product.findByPk(id);
    if (!pruduct) throw new Error("Producto no encontrado");
    return await pruduct.update(productData);
  }
  static async deleteProductById(id) {
    const pruduct = await Product.findByPk(id);
    if (!pruduct) throw new Error("Producto no encontrado");
    await pruduct.destroy();
    return console.log("✅ Producto eliminado de la base de datos.");
  }
}
