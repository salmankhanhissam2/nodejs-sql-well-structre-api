import { Sequelize } from "sequelize";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "default_db",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
    logging: false, // Disable SQL query logging
  }
);

export default sequelize;
