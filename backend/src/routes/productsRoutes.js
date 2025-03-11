import express from "express";
import productController from "../controllers/productController.js";

export const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/categories", productController.getCategories);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProductById);
router.delete("/:id", productController.deleteProductById);
