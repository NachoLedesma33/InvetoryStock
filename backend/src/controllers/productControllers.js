import { ProductServices } from "../services/productsServices.js";

const productCrontroller = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await ProductServices.getPruduts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await ProductServices.getProductById(id);
      product
        ? res.status(200).json(product)
        : res.status(404).json({ message: "Producto no encontrado" });
    } catch (error) {
      next(error);
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const newProduct = await ProductServices.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  updateProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateProduct = await ProductServices.updateProductById(
        id,
        req.body
      );
      res.status(200).json(updateProduct);
    } catch (next) {
      next(error);
    }
  },
  deleteProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await ProductServices.deleteProductById(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};

export default productCrontroller;
