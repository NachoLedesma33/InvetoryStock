import express from "express";
import cartController from "../controllers/cartController.js";
import { authenticateToken } from "../middlewares/auth.js";

export const router = express.Router();


router.use(authenticateToken);
router.get("/", cartController.getCart);
router.post("/items", cartController.addToCart);
router.put("/items/:productId", cartController.updateCartItem);
router.delete("/items/:productId", cartController.removeFromCart);
router.delete("/", cartController.clearCart);
