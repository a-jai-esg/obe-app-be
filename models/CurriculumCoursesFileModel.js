import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

// Get curriculum courses by revision and course code
const getCurriculumCourses = async (program_code) => {
  const [rows] = await pool.query(
    `SELECT 
        ccf.*, 
        cmd.Curr_Rev_Code, 
        cmd.Program_Code, 
        cmd.Curr_Year AS Effective_Year 
     FROM Curriculum_Courses_File ccf 
     LEFT JOIN Curriculum_Master_Data cmd 
     ON ccf.Curr_Rev_Code = cmd.Curr_Rev_Code 
     WHERE cmd.Program_Code = ?`,
    [program_code]
  );
  return rows;
};

// Create curriculum courses
const createCurriculumCourses = async (curriculumCourses) => {
  const {
    curr_rev_code,
    curr_course_code,
    curr_course_desc,
    curr_year,
    curr_sem,
    curr_units,
    curr_lec_hrs,
    curr_lab_hrs,
    curr_status,
    curr_crs_custom_field1,
    curr_crs_custom_field2,
    curr_crs_custom_field3,
  } = curriculumCourses;

  const [result] = await pool.query(
    `INSERT INTO ${TableNames.CURR_COURSES_FILE_TABLE} 
    (Curr_Rev_Code, Curr_Course_Code, Curr_Course_Desc, Curr_Year, 
    Curr_Sem, Curr_Units, Curr_LEC_Hrs, Curr_LAB_Hrs, Curr_Status, 
    Curr_CRS_CustomField1, Curr_CRS_CustomField2, Curr_CRS_CustomField3)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      curr_rev_code,
      curr_course_code,
      curr_course_desc,
      curr_year,
      curr_sem,
      curr_units,
      curr_lec_hrs,
      curr_lab_hrs,
      curr_status,
      curr_crs_custom_field1,
      curr_crs_custom_field2,
      curr_crs_custom_field3,
    ]
  );
  return { id: result.insertId, curriculumCourses };
};

// Update curriculum courses
const updateCurriculumCourses = async (
  curr_rev_code,
  curr_course_code,
  updatedFields
) => {
  const {
    curr_course_desc,
    curr_year,
    curr_sem,
    curr_units,
    curr_lec_hrs,
    curr_lab_hrs,
    curr_status,
    curr_crs_custom_field1,
    curr_crs_custom_field2,
    curr_crs_custom_field3,
  } = updatedFields;

  const updates = [];
  const values = [];

  if (curr_course_desc) {
    updates.push("Curr_Course_Desc = ?");
    values.push(curr_course_desc);
  }

  if (curr_year) {
    updates.push("Curr_Year = ?");
    values.push(curr_year);
  }

  if (curr_sem) {
    updates.push("Curr_Sem = ?");
    values.push(curr_sem);
  }

  if (curr_units) {
    updates.push("Curr_Units = ?");
    values.push(curr_units);
  }

  if (curr_lec_hrs) {
    updates.push("Curr_LEC_Hrs = ?");
    values.push(curr_lec_hrs);
  }

  if (curr_lab_hrs) {
    updates.push("Curr_LAB_Hrs = ?");
    values.push(curr_lab_hrs);
  }

  if (curr_status) {
    updates.push("Curr_Status = ?");
    values.push(curr_status);
  }

  if (curr_crs_customfield1) {
    updates.push("Curr_CRS_CustomField1 = ?");
    values.push(curr_crs_custom_field1);
  }

  if (curr_crs_customfield2) {
    updates.push("Curr_CRS_CustomField2 = ?");
    values.push(curr_crs_custom_field2);
  }

  if (curr_crs_customfield3) {
    updates.push("Curr_CRS_CustomField3 = ?");
    values.push(curr_crs_custom_field3);
  }

  values.push(curr_rev_code, curr_course_code);

  const [result] = await pool.query(
    `UPDATE ${TableNames.CURR_COURSES_FILE_TABLE} SET ${updates.join(", ")} 
    WHERE Curr_Rev_Code = ? AND Curr_Course_Code = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete curriculum courses
const deleteCurriculumCourses = async (curr_rev_code, curr_course_code) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.CURR_COURSES_FILE_TABLE} WHERE Curr_Rev_Code = ? AND Curr_Course_Code = ?`,
    [curr_rev_code, curr_course_code]
  );

  if (result.affectedRows === 0) {
    throw new Error("Curriculum not found");
  }

  return { message: "Curriculum course deleted successfully." };
};

export {
  getCurriculumCourses,
  createCurriculumCourses,
  updateCurriculumCourses,
  deleteCurriculumCourses,
};
