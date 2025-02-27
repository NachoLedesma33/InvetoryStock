import express from "express";
import productCrontroller from "./../controllers/productControllers.js";

export const router = express.Router();

router.get("/", productCrontroller.getAllProducts);
router.get("/:id", productCrontroller.getProductById);
router.post("/", productCrontroller.createProduct);
router.put("/:id", productCrontroller.updateProductById);
router.delete("/:id", productCrontroller.deleteProductById);
