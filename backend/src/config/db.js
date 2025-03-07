import { Sequelize } from "sequelize";
import {config} from "./env.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../", config.DB_PATH || "./database.sqlite"),
  logging: config.NODE.ENV === "development" ? console.log : false
})


export const initDatabase = async () =>{
  try{
    await db.authenticate();
    console.log("✅ Conectado a la base de datos.");
    return db
  }catch(error){
    console.log("❌ No se pudo conectar a la base de datos.");
  }
}
