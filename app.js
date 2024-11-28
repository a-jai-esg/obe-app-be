import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// routes
import userRoutes from "./routes/UserRoutes.js";
import departmentRoutes from "./routes/DepartmentRoutes.js";
import systemRoutes from "./routes/SystemRoutes.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "http://159.65.131.166:3000",
      "http://localhost:5173",
      "https://obe-app-outcome.web.app",
      "https://obe-app-main.web.app",
    ], // Array of allowed origins
    credentials: true, // Allow credentials (cookies)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allow specific headers
  })
);

app.use("/api/users", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/system", systemRoutes);

export default app;
