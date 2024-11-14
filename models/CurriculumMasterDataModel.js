import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

// Check if the curriculum exists
const checkCurriculum = async (programCode) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.CURR_MASTER_DATA_TABLE} WHERE Program_Code = ?`,
    [programCode]
  );
  return rows[0];
};

// Create a new curriculum
const createCurriculum = async (curriculum) => {
  const {
    program_code,
    curr_year,
    curr_rev_code,
    curr_status,
    curr_custom_field1,
    curr_custom_field2,
    curr_custom_field3,
  } = curriculum;

  console.log(curriculum);

  // Check if the curriculum already exists
  const existingCurriculum = await checkCurriculum(program_code);
  if (existingCurriculum) {
    return { message: "Curriculum already exists" };
  }

  try {
    // Create new curriculum
    const [result] = await pool.query(
      `INSERT INTO ${TableNames.CURR_MASTER_DATA_TABLE} 
    (Program_Code, Curr_Year, Curr_Rev_Code, Curr_Status,
    Curriculum_CustomField1, Curriculum_CustomField2, Curriculum_CustomField3)
    VALUES (?,?,?,?,?,?,?)`,
      [
        program_code,
        curr_year,
        curr_rev_code,
        curr_status,
        curr_custom_field1,
        curr_custom_field2,
        curr_custom_field3,
      ]
    );
    return { id: result.insertId, curriculum };
  } catch (error) {
    console.log(error.message);
  }
};

// Update curriculum details
const updateCurriculum = async (programCode, currRevCode, updatedFields) => {
  const {
    curr_year,
    curr_status,
    curr_custom_field1,
    curr_custom_field2,
    curr_custom_field3,
  } = updatedFields;

  // Check if the curriculum exists
  const existingCurriculum = await checkCurriculum(programCode, currRevCode);
  if (!existingCurriculum) {
    throw new Error("Curriculum not found");
  }

  const updates = [];
  const values = [];

  if (curr_year) {
    updates.push("Curr_Year = ?");
    values.push(curr_year);
  }

  if (curr_status) {
    updates.push("Curr_Status = ?");
    values.push(curr_status);
  }

  if (curr_custom_field1) {
    updates.push("Curriculum_CustomField1 = ?");
    values.push(curr_custom_field1);
  }

  if (curr_custom_field2) {
    updates.push("Curriculum_CustomField2 = ?");
    values.push(curr_custom_field2);
  }

  if (curr_custom_field3) {
    updates.push("Curriculum_CustomField3 = ?");
    values.push(curr_custom_field3);
  }

  values.push(programCode, currRevCode);

  const [result] = await pool.query(
    `UPDATE ${TableNames.CURR_MASTER_DATA_TABLE} SET ${updates.join(", ")} 
    WHERE Program_Code = ? AND Curr_Rev_Code = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete curriculum
const deleteCurriculum = async (program_code, curr_rev_code) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.CURR_MASTER_DATA_TABLE} WHERE Program_Code = ? AND Curr_Rev_Code = ?`,
    [program_code, curr_rev_code]
  );

  if (result.affectedRows === 0) {
    throw new Error("Curriculum not found");
  }

  return { message: "Curriculum deleted successfully." };
};

export {
  createCurriculum,
  checkCurriculum,
  updateCurriculum,
  deleteCurriculum,
};
