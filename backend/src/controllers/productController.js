import { ProductService } from "../services/productsService.js";

const productController = {
  getAllProducts: async (req, res, next) => {
    try {
      const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
      
      const options = {
        category,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        search,
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit)
      };

      const products = await ProductService.getProducts(options);
      res.status(200).json(products);
    } catch (error) {
      console.log("Error al obtener los productos");
      next(error);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      console.log("Error al obtener el producto");
      next(error);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      if (error.message.includes("requeridos") || 
          error.message.includes("número") ||
          error.message.includes("URL")) {
        return res.status(400).json({ message: error.message });
      }
      console.log("Error al crear el producto");
      next(error);
    }
  },

  updateProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedProduct = await ProductService.updateProductById(id, req.body);
      res.status(200).json(updatedProduct);
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("número") || error.message.includes("URL")) {
        return res.status(400).json({ message: error.message });
      }
      console.log("Error al actualizar el producto");
      next(error);
    }
  },

  deleteProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProductById(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Producto no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      console.log("Error al eliminar el producto");
      next(error);
    }
  },

  getCategories: async (req, res, next) => {
    try {
      const categories = await ProductService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.log("Error al obtener las categorías");
      next(error);
    }
  }
};

export default productController;
