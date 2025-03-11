import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Cart } from "../models/Cart.js";

export class UserService {
  static async createDefaultUser() {
    try {
      const defaultUser = {
        username: "demo",
        email: "demo@demo.com",
        password: "demo123",
      };
      const [user, created] = await User.findOrCreate({
        where: { username: defaultUser.username },
        defaults: defaultUser,
      });
      if (created) {
        await Cart.create({
          userId: user.id,
        });
        console.log("✅Usuario por defecto creado");
      } else {
        console.log("❗❗Usuario por defecto ya existe");
      }
      return user;
    } catch (error) {
      console.log("❌Error al crear el usuario por defecto");
      throw error;
    }
  }
  static async getAllUsers() {
    try {
      return await User.findAll({
        attributes: { exclude: ["password"] },
      });
    } catch (error) {
      console.log("❌Error al obtener los usuarios");
      throw error;
    }
  }
  static async getUserById(id) {
    try {
      return await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
    } catch (error) {
      console.log("❌Error al obtener el usuario por su id");
      throw error;
    }
  }
  static async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await User.create({
        ...userData,
        password: hashedPassword,
      });
      await Cart.create({ userId: newUser.id });
      const { password, ...userWithoutPassword } = newUser.toJSON();
      return userWithoutPassword;
    } catch (error) {
      console.log("❌Error al crear el usuario");
      throw error;
    }
  }
  static async updateUserById(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("Usuario no encontrado");
      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
      }
      await user.update(userData);
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      console.log("❌Error al actualizar el usuario");
      throw error;
    }
  }
  static async deleteUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("Usuario no encontrado");
      await user.destroy();
      return { message: "Usuario eliminado" };
    } catch (error) {
      console.log("❌Error al eliminar el usuario");
      throw error;
    }
  }
  static async authenticateUser({ username, password }) {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return null;
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      console.log("❌Error al autenticar el usuario");
      throw error;
    }
  }
}
