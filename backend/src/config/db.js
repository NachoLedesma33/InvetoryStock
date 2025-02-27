import { Sequelize } from "sequelize";
import config from "./env.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: config.db_storage,
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexion exitosa a la base de datos.");
  } catch (error) {
    console.log("❌ No se pudo conectar a la base de datos." + error);
  }
};

export { sequelize, testConnection };
