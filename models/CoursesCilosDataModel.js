import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

// Get courses CILOs by CILO code and course code
const getCoursesCilosByCiloAndCourseCode = async (
  cilo_code,
  curr_course_code
) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.COURSES_CILOS_DATA_TABLE} WHERE CILO_Code = ? AND Curr_Course_Code = ?`,
    [cilo_code, curr_course_code]
  );
  return rows[0];
};

// Create courses CILOs
const createCoursesCilos = async (coursesCilos) => {
  const {
    cilo_code,
    curr_course_code,
    cilo_desc,
    cilo_status,
    cilo_customfield1,
    cilo_customfield2,
    cilo_customfield3,
  } = coursesCilos;

  const [result] = await pool.query(
    `INSERT INTO ${TableNames.COURSES_CILOS_DATA_TABLE} 
    (CILO_Code, Curr_Course_Code, CILO_Desc, CILO_Status, 
    CILO_CustomField1, CILO_CustomField2, CILO_CustomField3)
     VALUES (?,?,?,?,?,?,?)`,
    [
      cilo_code,
      curr_course_code,
      cilo_desc,
      cilo_status,
      cilo_customfield1,
      cilo_customfield2,
      cilo_customfield3,
    ]
  );
  return { id: result.insertId, coursesCilos };
};

// Update courses CILOs
const updateCoursesCilos = async (
  cilo_code,
  curr_course_code,
  updatedFields
) => {
  const {
    cilo_desc,
    cilo_status,
    cilo_customfield1,
    cilo_customfield2,
    cilo_customfield3,
  } = updatedFields;

  const updates = [];
  const values = [];

  if (cilo_desc) {
    updates.push("CILO_Desc = ?");
    values.push(cilo_desc);
  }

  if (cilo_status) {
    updates.push("CILO_Status = ?");
    values.push(cilo_status);
  }

  if (cilo_customfield1) {
    updates.push("CILO_CustomField1 = ?");
    values.push(cilo_customfield1);
  }

  if (cilo_customfield2) {
    updates.push("CILO_CustomField2 = ?");
    values.push(cilo_customfield2);
  }

  if (cilo_customfield3) {
    updates.push("CILO_CustomField3 = ?");
    values.push(cilo_customfield3);
  }

  values.push(cilo_code, curr_course_code);

  const [result] = await pool.query(
    `UPDATE ${TableNames.COURSES_CILOS_DATA_TABLE} SET ${updates.join(", ")} 
    WHERE CILO_Code = ? AND Curr_Course_Code = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete courses CILOs
const deleteCoursesCilos = async (cilo_code, curr_course_code) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.COURSES_CILOS_DATA_TABLE} WHERE CILO_Code = ? AND Curr_Course_Code = ?`,
    [cilo_code, curr_course_code]
  );

  if (result.affectedRows === 0) {
    throw new Error("Courses CILOs not found");
  }

  return { message: "Courses CILOs deleted successfully." };
};

export {
  getCoursesCilosByCiloAndCourseCode,
  createCoursesCilos,
  updateCoursesCilos,
  deleteCoursesCilos,
};
