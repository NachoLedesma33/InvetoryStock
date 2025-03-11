export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Error de validación",
      errors: err.errors.map((e) => e.message),
    });
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      message: "Error de validación",
      errors: err.errors.map((e) => e.message),
    });
  }
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
  });
};
