import express from "express";
import userController from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

export const router = express.Router();


router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/demo", userController.getDefaultUser);

router.use(authenticateToken);

router.get("/", userController.getAllUsers);
router.get("/profile", userController.getUserById); 
router.put("/profile", userController.updateUserById); 
router.delete("/profile", userController.deleteUserById); 
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);