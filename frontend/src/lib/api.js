import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.deafaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Error de respuesta del servidor: ", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.log("No se recibió respuesta del servidor", error.request);
      return Promise.reject({
        message: "No se recibió respuesta del servidor",
      });
    } else {
      console.log("Error al configurar la peticion: ", error.requeste);
      return Promise.reject({ message: "Error al configurar la peticion" });
    }
  }
);

export const login = async (userData) => {
  try {
    const response = await api.post("/users/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  setAuthToken(null);
};

export const getProduct = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;