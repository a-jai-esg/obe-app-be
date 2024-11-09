import express from "express";
import {
  getUserByUsernameController,
  loginUserController,
  logoutUserController,
  updateUserController,
  registerUserController,
} from "../controllers/UserController.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const userRoutes = express.Router();

userRoutes.post("/search", authenticateJWT, getUserByUsernameController);
userRoutes.post("/register", registerUserController);
userRoutes.post("/update", authenticateJWT, updateUserController);
userRoutes.post("/login", loginUserController);
userRoutes.post("/logout", authenticateJWT, logoutUserController);

export default userRoutes;
