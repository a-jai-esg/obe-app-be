// models/DepartmentModel.js
import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

const getDepartmentsData = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const sqlQuery = `SELECT * FROM ${TableNames.DEPT_TABLE}`;
    const [rows] = await connection.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error in query execution:", error);
    return [];
  } finally {
    if (connection) connection.release();
  }
};

const getDepartmentById = async (department_id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const sqlQuery = `SELECT * FROM ${TableNames.DEPT_TABLE} WHERE Record_ID = ?`;
    const [rows] = await connection.query(sqlQuery, [department_id]);
    return rows;
  } catch (error) {
    console.error("Error in query execution:", error);
    return [];
  } finally {
    if (connection) connection.release();
  }
};

export { getDepartmentsData, getDepartmentById };
