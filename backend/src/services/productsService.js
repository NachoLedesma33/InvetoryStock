import axios from "axios";
import { Product } from "../models/Product.js";

export class ProductService {
  static async fetchProducts() {
    try {
      const response = await axios.get(process.env.PRODUCTS_API_URL);
      const products = response.data.map((item) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        description: item.description,
        category: item.category,
        image: item.image,
      }));

      await Product.bulkCreate(products, {
        updateOnDuplicate: [
          "title",
          "price",
          "description",
          "category",
          "image",
        ],
      });
      return products;
    } catch (error) {
      console.log(
        "❌ No se pudieron cargar los productos en la base de datos."
      );
      throw error;
    }
  }

  static async getProducts(options = {}) {
    try {
      const {
        category,
        minPrice,
        maxPrice,
        search,
        limit = 10,
        offset = 0,
      } = options;

      const where = {};

      if (category) {
        where.category = category;
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};
        if (minPrice !== undefined) where.price.$gte = minPrice;
        if (maxPrice !== undefined) where.price.$lte = maxPrice;
      }

      if (search) {
        where.$or = [
          { title: { $like: `%${search}%` } },
          { description: { $like: `%${search}%` } },
        ];
      }

      const products = await Product.findAndCountAll({
        where,
        limit,
        offset,
        order: [["id", "ASC"]],
        attributes: [
          "id",
          "title",
          "price",
          "description",
          "category",
          "image",
        ],
      });

      return {
        items: products.rows,
        total: products.count,
        page: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(products.count / limit),
      };
    } catch (error) {
      console.log("❌ Error al obtener los productos");
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const product = await Product.findByPk(id, {
        attributes: [
          "id",
          "title",
          "price",
          "description",
          "category",
          "image",
        ],
      });
      if (!product) throw new Error("Producto no encontrado");
      return product;
    } catch (error) {
      console.log("❌ Error al obtener el producto");
      throw error;
    }
  }

  static async createProduct(productData) {
    try {
      const requiredFields = [
        "title",
        "price",
        "description",
        "category",
        "image",
      ];
      const missingFields = requiredFields.filter(
        (field) => !productData[field]
      );

      if (missingFields.length > 0) {
        throw new Error(
          `Campos requeridos faltantes: ${missingFields.join(", ")}`
        );
      }

      if (typeof productData.price !== "number" || productData.price <= 0) {
        throw new Error("El precio debe ser un número mayor a 0");
      }

      if (!productData.image.startsWith("http")) {
        throw new Error("La imagen debe ser una URL válida");
      }

      const product = await Product.create({
        title: productData.title,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        image: productData.image,
      });

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      };
    } catch (error) {
      console.log("❌ Error al crear el producto");
      throw error;
    }
  }

  static async updateProductById(id, productData) {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw new Error("Producto no encontrado");

      if (productData.price !== undefined) {
        if (typeof productData.price !== "number" || productData.price <= 0) {
          throw new Error("El precio debe ser un número mayor a 0");
        }
      }

      if (
        productData.image !== undefined &&
        !productData.image.startsWith("http")
      ) {
        throw new Error("La imagen debe ser una URL válida");
      }

      await product.update(productData);

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      };
    } catch (error) {
      console.log("❌ Error al actualizar el producto");
      throw error;
    }
  }

  static async deleteProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw new Error("Producto no encontrado");

      await product.destroy();
      return { message: "Producto eliminado exitosamente" };
    } catch (error) {
      console.log("❌ Error al eliminar el producto");
      throw error;
    }
  }

  static async getCategories() {
    try {
      const categories = await Product.findAll({
        attributes: ["category"],
        group: ["category"],
        order: [["category", "ASC"]],
      });
      return categories.map((c) => c.category);
    } catch (error) {
      console.log("❌ Error al obtener las categorías");
      throw error;
    }
  }
}
