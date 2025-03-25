import bcrypt from "bcrypt";
import axios from "axios";
import { User } from "../models/User.js";
import { Cart } from "../models/Cart.js";

export class UserService {
  static async fetchUsers() {
    try {
      const response = await axios.get(process.env.USERS_API_URL);
      const users = response.data;

      for (const userData of users) {
        const [user] = await User.findOrCreate({
          where: { id: userData.id },
          defaults: {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            isApiUser: true,
          },
        });
      }

      console.log("✅ Usuarios cargados desde la API");
      return users;
    } catch (error) {
      console.log("❌ Error al cargar los usuarios desde la API");
      throw error;
    }
  }
  static async createDefaultUser() {
    try {
      const defaultUser = {
        username: "demo",
        email: "demo@demo.com",
        password: await bcrypt.hash("demo123", 10),
      };
      const [user, created] = await User.findOrCreate({
        where: { username: defaultUser.username },
        defaults: defaultUser,
      });
      if (created) {
        await Cart.create({
          userId: user.id,
        });
        console.log("✅ Usuario por defecto creado");
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
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) throw new Error("Usuario no encontrado");
      return user;
    } catch (error) {
      console.log("❌Error al obtener el usuario por su id");
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      if (!userData.username || !userData.email || !userData.password) {
        throw new Error("Todos los campos son requeridos");
      }
      if (userData.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

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
        if (userData.password.length < 6) {
          throw new Error("La contraseña debe tener al menos 6 caracteres");
        }
        userData.password = await bcrypt.hash(userData.password, 10);
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
      return { message: "Usuario eliminado exitosamente" };
    } catch (error) {
      console.log("❌Error al eliminar el usuario");
      throw error;
    }
  }

  static async authenticateUser({ username, password }) {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) return null;

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return null;

      const { password: _, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      console.log("❌Error al autenticar el usuario");
      throw error;
    }
  }

  static async getDefaultUser() {
    try {
      const user = await User.findOne({ where: { username: "demo" } });
      if (!user) throw new Error("Usuario demo no encontrado");

      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      console.log("❌Error al obtener el usuario demo");
      throw error;
    }
  }
}
