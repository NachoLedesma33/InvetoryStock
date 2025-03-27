export const validateUser = (userData) => {
  const errors = {};

  // Validación de nombre
  if (!userData.name) {
    errors.name = "El nombre es requerido";
  } else if (userData.name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  // Validación de email
  if (!userData.email) {
    errors.email = "El email es requerido";
  } else if (!validateEmail(userData.email)) {
    errors.email = "Formato de email inválido";
  }

  // Validación de contraseña
  if (!userData.password) {
    errors.password = "La contraseña es requerida";
  } else if (!validatePassword(userData.password)) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números";
  }

  // Validación de teléfono
  if (userData.phone && !validatePhone(userData.phone)) {
    errors.phone = "Formato de teléfono inválido";
  }

  return errors;
};

export const validateProduct = (productData) => {
  const errors = {};

  // Validación de nombre
  if (!productData.name) {
    errors.name = "El nombre es requerido";
  } else if (productData.name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  // Validación de descripción
  if (!productData.description) {
    errors.description = "La descripción es requerida";
  } else if (productData.description.length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  }

  // Validación de precio
  if (!productData.price) {
    errors.price = "El precio es requerido";
  } else if (isNaN(productData.price) || productData.price <= 0) {
    errors.price = "El precio debe ser un número positivo";
  }

  // Validación de stock
  if (!productData.stock) {
    errors.stock = "El stock es requerido";
  } else if (isNaN(productData.stock) || productData.stock < 0) {
    errors.stock = "El stock debe ser un número no negativo";
  }

  // Validación de categoría
  if (!productData.category) {
    errors.category = "La categoría es requerida";
  }

  return errors;
};

export const validateOrder = (orderData) => {
  const errors = {};

  // Validación de productos
  if (!orderData.products || orderData.products.length === 0) {
    errors.products = "Debe seleccionar al menos un producto";
  }

  // Validación de dirección
  if (!orderData.address) {
    errors.address = "La dirección es requerida";
  } else if (orderData.address.length < 10) {
    errors.address = "La dirección debe tener al menos 10 caracteres";
  }

  // Validación de método de pago
  if (!orderData.paymentMethod) {
    errors.paymentMethod = "Debe seleccionar un método de pago";
  }

  return errors;
};

// Funciones de validación individuales

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export const validateNumber = (value) => {
  return !isNaN(value) && value !== null && value !== undefined;
};

export const validatePositiveNumber = (value) => {
  return validateNumber(value) && value > 0;
};

export const validateNonNegativeNumber = (value) => {
  return validateNumber(value) && value >= 0;
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== "";
};

export const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value.length <= maxLength;
};

export const validateUrl = (url) => {
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};

export const validateImage = (file) => {
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return file && validTypes.includes(file.type) && file.size <= maxSize;
};

// Funciones de validación de formularios

export const validateForm = (formData, validationRules) => {
  const errors = {};

  Object.entries(formData).forEach(([field, value]) => {
    const rules = validationRules[field];

    if (rules) {
      rules.forEach((rule) => {
        const [validator, ...args] = rule;
        const result =
          typeof validator === "function"
            ? validator(value, ...args)
            : value[validator](...args);

        if (!result) {
          errors[field] = `El campo ${field} no cumple con la validación`;
        }
      });
    }
  });

  return errors;
};

export const validateFileUpload = (
  files,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024
) => {
  const errors = {};

  if (!files) {
    errors.files = "No se han seleccionado archivos";
    return errors;
  }

  if (files.length > maxFiles) {
    errors.files = `Solo se pueden subir hasta ${maxFiles} archivos`;
    return errors;
  }

  files.forEach((file, index) => {
    if (file.size > maxSize) {
      errors[`file_${index}`] = `El archivo ${
        file.name
      } es demasiado grande (máximo ${maxSize / 1024 / 1024}MB)`;
    }
  });

  return errors;
};

// Funciones de validación de fechas

export const validateDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

export const validateFutureDate = (date) => {
  return new Date(date) > new Date();
};

export const validatePastDate = (date) => {
  return new Date(date) < new Date();
};

// Funciones de validación de rangos

export const validateRange = (value, min, max) => {
  return value >= min && value <= max;
};

export const validateNumberRange = (value, min, max) => {
  return validateNumber(value) && validateRange(value, min, max);
};

// Funciones de validación de patrones

export const validatePattern = (value, pattern) => {
  const regex = new RegExp(pattern);
  return regex.test(value);
};

export const validateCustom = (value, validator) => {
  return validator(value);
};
