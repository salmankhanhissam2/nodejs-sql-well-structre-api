import express, { Application } from "express";
import bodyParser from "body-parser";
import userRoutes from "./modules/user/user.routes";
import sequelize from "./config/dbConnection";
import dotenv from "dotenv";
import shopRoutes from "./modules/shop/shop.routes";
import cors from "cors";
dotenv.config(); // Load environment variables

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Set allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Routes
app.use("/api/users", userRoutes);
app.use("/api/shop", shopRoutes);

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
