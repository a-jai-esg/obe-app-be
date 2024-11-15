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
    origin: "http://localhost:5173", // The exact origin of your frontend (change this if different)
    credentials: true, // Allow credentials (cookies)
  })
);

app.use("/api/users", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/system", systemRoutes);

export default app;
