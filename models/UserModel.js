import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getUserByUsername = async (username) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.USER_TABLE} WHERE username = ?`,
    [username]
  );
  return rows[0];
};

// register
const registerUser = async (user) => {
  const {
    user_id,
    first_name,
    last_name,
    email_address,
    username,
    password,
    department_id,
  } = user;

  const [result] = await pool.query(
    `INSERT INTO ${TableNames.USER_TABLE} (User_ID, First_Name, Last_Name, Email_Address, Username, Password, Department_ID)
     VALUES (?,?,?,?,?,?, ?)`,
    [
      user_id,
      first_name,
      last_name,
      email_address,
      username,
      password,
      department_id,
    ]
  );
  return { id: result.insertId, username };
};

// login
const loginUser = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.Password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: user.ID, username: user.Username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user: { User_ID: user.User_ID, Username: user.Username } };
};

// update
const updateUser = async (username, updatedFields) => {
  const { first_name, last_name, email_address, password, department_id } =
    updatedFields;

  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }

  const updates = [];
  const values = [];

  if (first_name) {
    updates.push("First_Name = ?");
    values.push(first_name);
  }

  if (last_name) {
    updates.push("Last_Name = ?");
    values.push(last_name);
  }

  if (email_address) {
    updates.push("Email_Address = ?");
    values.push(email_address);
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updates.push("Password = ?");
    values.push(hashedPassword);
  }

  if (department_id) {
    updates.push("Department_ID = ?");
    values.push(department_id);
  }

  values.push(username);

  const [result] = await pool.query(
    `UPDATE ${TableNames.USER_TABLE} SET ${updates.join(
      ", "
    )} WHERE Username = ?`,
    values
  );

  return result.affectedRows > 0;
};

export { getUserByUsername, registerUser, loginUser, updateUser };
