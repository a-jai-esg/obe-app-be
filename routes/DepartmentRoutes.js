// routes/departmentRoutes.js
import express from "express";
import { getDepartmentsDataController } from "../controllers/DepartmentController.js";
const departmentRoutes = express.Router();

departmentRoutes.get("/list", getDepartmentsDataController);

export default departmentRoutes;
