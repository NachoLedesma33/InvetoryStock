import { Sequelize } from "sequelize";
import config from "./env.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../", config.db_storage),
  logging: false 
})

export const initDatabase = async () =>{
  try{
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos.");
    return sequelize
  }catch(error){
    console.log("❌ No se pudo conectar a la base de datos.");
    throw error;
  }
}
