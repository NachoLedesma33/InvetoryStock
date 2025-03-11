import { UserService } from "../services/userServices.js";

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
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Los datos son requeridos" });
      }
      const user = await UserService.createUser({ username, email, password });
      res.status(201).json(user);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "El usuario ya existe" });
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
      console.log("Error al actualizar el usuario");
      next(error);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await UserServices.deleteUserById(id);
      res.status(204).json();
    } catch (error) {
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
        return res.status(401).json({ message: "Credenciales invalidas" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log("Error al iniciar sesión");
      next(error);
    }
  },
  getDefaultUser: async (req, res, next) => {
    try {
      const defaultUser = await UserService.getDefaultUser();
      res.status(200).json({
        message: "Usuario por defecto",
        email: {
          username: defaultUser.username,
          email: defaultUser.email,
          password: "Para la demo la contraseña es: demo123",
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
