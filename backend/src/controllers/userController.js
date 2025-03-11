import { UserService } from "../services/userService.js";

export const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log("Error al obtener los usuarios");
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log("Error al obtener el usuario");
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const user = await UserService.createUser({ username, email, password });
      res.status(201).json(user);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "El usuario ya existe" });
      }
      if (error.message.includes("requeridos") || error.message.includes("contraseña")) {
        return res.status(400).json({ message: error.message });
      }
      console.log("Error al crear el usuario");
      next(error);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUser = await UserService.updateUserById(id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes("contraseña")) {
        return res.status(400).json({ message: error.message });
      }
      console.log("Error al actualizar el usuario");
      next(error);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await UserService.deleteUserById(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      console.log("Error al eliminar el usuario");
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Los datos son requeridos" });
      }
      const user = await UserService.authenticateUser({
        username,
        password,
      });
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log("Error al iniciar sesión");
      next(error);
    }
  },

  getDefaultUser: async (req, res, next) => {
    try {
      const defaultUser = await UserService.getDefaultUser();
      res.status(200).json({
        message: "Usuario por defecto",
        user: defaultUser
      });
    } catch (error) {
      if (error.message === "Usuario demo no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  },
};

export default userController;
