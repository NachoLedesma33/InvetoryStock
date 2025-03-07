import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    db_storage: process.env.DB_STORAGE || "./database_dev.sqlite",
    jwt_secret: process.env.JWT_SECRET || "secret",
    jwt_expires_in: process.env.JWT_EXPIRES_IN || "1d",
    port : process.env.PORT || 4000,
    products_api_url: process.env.PRODUCTS_API_URL || "https://fakestoreapi.com/products",
    carts_api_url: process.env.CARTS_API_URL || "https://fakestoreapi.com/carts",
    users_api_url: process.env.USERS_API_URL || "https://fakestoreapi.com/users",
  },
  test: {
    db_storage: process.env.DB_STORAGE_TEST || "./database_test.sqlite",
    jwt_secret: process.env.JWT_SECRET || "secret",
    jwt_expires_in: process.env.JWT_EXPIRES_IN || "1d",
    port : process.env.PORT || 4000,
    products_api_url: process.env.PRODUCTS_API_URL || "https://fakestoreapi.com/products",
    carts_api_url: process.env.CARTS_API_URL || "https://fakestoreapi.com/carts",
    users_api_url: process.env.USERS_API_URL || "https://fakestoreapi.com/users",
  },
  production: {
    db_storage: process.env.DB_STORAGE,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    port : process.env.PORT,
    products_api_url: process.env.PRODUCTS_API_URL,
    carts_api_url: process.env.CARTS_API_URL,
    users_api_url: process.env.USERS_API_URL
  },
};

export default config[env];
