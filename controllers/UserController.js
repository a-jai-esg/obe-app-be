import UserIDGenerator from "../misc/UserIdGenerator.js";
import {
  registerUser,
  getUserByUsername,
  loginUser,
  updateUser,
} from "../models/UserModel.js";
import { getDepartmentById } from "../models/DepartmentModel.js";
import bcrypt from "bcrypt";

const getUserByUsernameController = async (req, res) => {
  const { username } = req.body;
  try {
    const data = await getUserByUsername(username);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUserController = async (req, res) => {
  const {
    first_name,
    last_name,
    email_address,
    username,
    password,
    department_id,
  } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await getUserByUsername(username); // You need to create this function in your UserModel
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const department = await getDepartmentById(department_id);

    const departmentCode = department.map((result) => {
      return result.Department_Code;
    });

    const user_id = await UserIDGenerator(
      first_name,
      last_name,
      departmentCode
    );
    // Save the user to the database
    const newUser = await registerUser({
      user_id,
      first_name,
      last_name,
      email_address,
      username,
      password: hashedPassword,
      department_id,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateUserController = async (req, res) => {
  const {
    username,
    first_name,
    last_name,
    email_address,
    password,
    department_id,
  } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const updatedFields = {
    first_name,
    last_name,
    email_address,
    password,
    department_id,
  };

  try {
    const result = await updateUser(username, updatedFields);
    if (result) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUserController = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body); // Log the request body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const { token, user } = await loginUser(username, password);

    // Set the JWT token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Ensures the cookie is only accessible by the web server
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS only in production
      maxAge: 3600000, // 1 hour expiration
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logoutUserController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure the cookie is only cleared over HTTPS in production
    sameSite: "strict", // Optional: Controls when the cookie is sent; can be 'strict', 'lax', or 'none'
  });
  res.status(200).json({ message: "Logout successful" });
};

export {
  getUserByUsernameController,
  registerUserController,
  loginUserController,
  updateUserController,
  logoutUserController,
};
