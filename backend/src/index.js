import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection, sequelize } from "./config/db.js";
import { ProductService } from "./services/productsService.js";
import { UserService } from "./services/userService.js";
import { router as productsRouter } from "./routes/productsRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as cartRouter } from "./routes/cartRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", productsRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);

app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await testConnection();
    await sequelize.sync({ alter: true });
    await UserService.createDefaultUser();
    await ProductService.fetchProducts();

    app.listen(PORT, () => {
      console.log("✅ Base de datos conectada");
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
