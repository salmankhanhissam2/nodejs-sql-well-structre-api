import express, { Application } from "express";
import bodyParser from "body-parser";
import userRoutes from "./modules/user/user.routes";
import sequelize from "./config/dbConnection";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

// Start the server
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
