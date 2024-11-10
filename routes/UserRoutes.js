import express from "express";
import {
  getUserByUsernameController,
  loginUserController,
  logoutUserController,
  updateUserController,
  registerUserController,
} from "../controllers/UserController.js";
import { authenticateJwt } from "../middleware/authenticateJwt.js";

const userRoutes = express.Router();

// account-related
userRoutes.post("/search", authenticateJwt, getUserByUsernameController);
userRoutes.post("/register", registerUserController);
userRoutes.post("/update", authenticateJwt, updateUserController);
userRoutes.post("/login", loginUserController);
userRoutes.post("/logout", authenticateJwt, logoutUserController);

export default userRoutes;
