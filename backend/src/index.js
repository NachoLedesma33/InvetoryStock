import express from "express";
import cors from "cors";
import { testConnection, sequelize } from "./config/db.js";
import { ProductServices } from "./services/productsServices.js";
import { router as productsRouter } from "./routes/productsRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/products", productsRouter);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await testConnection();
  await sequelize.sync({ force: true });
  await ProductServices.fetchProducts();

  app.listen(PORT, () =>
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`)
  );
};

startServer();
