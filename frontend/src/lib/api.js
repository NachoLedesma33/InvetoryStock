import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:4000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error en request interceptor:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en response interceptor:", error);
    const { response } = error;

    if (response && response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
