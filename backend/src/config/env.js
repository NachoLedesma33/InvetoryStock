import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    db_storage: process.env.DB_STORAGE || "./database_dev.sqlite",
  },
  test: {
    db_storage: process.env.DB_STORAGE_TEST || "./database_test.sqlite",
  },
  production: {
    db_storage: process.env.DB_STORAGE,
  },
};

export default config[env];
