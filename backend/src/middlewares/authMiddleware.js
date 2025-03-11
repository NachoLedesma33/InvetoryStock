import { User } from "../models/User.js";

export const authMiddleware = {
  isAuthenticated: async (req, res, next) => {
    try {
      const userId = req.params.userId || req.body.userId;
      if (!userId) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Error en la autenticación" });
    }
  },
  isAdmin: async (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(401)
        .json({ message: "Acceso del administrador es requerido" });
    }
    next();
  },
};

export default authMiddleware;

