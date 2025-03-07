import { ProductServices } from "../services/productsServices.js";

const productCrontroller = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await ProductServices.getPruduts();
      res.status(200).json(products);
    } catch (error) {
      console.log("Error al econtrar todos lo productos");
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
      console.log("Error al econtrar el producto");
      next(error);
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const newProduct = await ProductServices.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.log("Error al crear el producto");
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
      console.log("Error al actualizar el producto");
      next(error);
    }
  },
  deleteProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await ProductServices.deleteProductById(id);
      res.status(204).json();
    } catch (error) {
      console.log("Error al eliminar el producto");
      next(error);
    }
  },
};

export default productCrontroller;
