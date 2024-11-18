import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

// Check if the program exists
const retrievePrograms = async (program_dept) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.PROGRAMS_MASTER_DATA_TABLE} WHERE Program_Dept = ?`,
    [program_dept]
  );
  return rows;
};

// Create a new program
const createProgram = async (program) => {
  const {
    program_code,
    program_title,
    program_dept,
    program_status,
    program_custom_field1,
    program_custom_field2,
    program_custom_field3,
  } = program;

  // Check if the program already exists
  const existingProgram = await checkProgram(program_dept, program_title);
  if (existingProgram) {
    return { message: "Program already exists" };
  }

  // Create new program
  const [result] = await pool.query(
    `INSERT INTO ${TableNames.PROGRAMS_MASTER_DATA_TABLE} 
    (Program_Code, Program_Title, Program_Dept,
    Program_Status, Program_CustomField1, Program_CustomField2,
    Program_CustomField3)
    VALUES (?,?,?,?,?,?,?)`,
    [
      program_code,
      program_title,
      program_dept,
      program_status,
      program_custom_field1,
      program_custom_field2,
      program_custom_field3,
    ]
  );
  return { id: result.insertId, program };
};

// Update program details
const updateProgram = async (program_code, updatedFields) => {
  const {
    program_title,
    program_dept,
    program_status,
    program_custom_field1,
    program_custom_field2,
    program_custom_field3,
  } = updatedFields;

  // Check if the program exists
  const [program] = await pool.query(
    `SELECT * FROM ${TableNames.PROGRAMS_MASTER_DATA_TABLE} WHERE Program_Code = ?`,
    [program_code]
  );
  if (!program.length) {
    throw new Error("Program not found");
  }

  const updates = [];
  const values = [];

  if (program_title) {
    updates.push("Program_Title = ?");
    values.push(program_title);
  }

  if (program_dept) {
    updates.push("Program_Dept = ?");
    values.push(program_dept);
  }

  if (program_status) {
    updates.push("Program_Status = ?");
    values.push(program_status);
  }

  if (program_custom_field1) {
    updates.push("Program_CustomField1 = ?");
    values.push(program_custom_field1);
  }

  if (program_custom_field2) {
    updates.push("Program_CustomField2 = ?");
    values.push(program_custom_field2);
  }

  if (program_custom_field3) {
    updates.push("Program_CustomField3 = ?");
    values.push(program_custom_field3);
  }

  values.push(programCode);

  const [result] = await pool.query(
    `UPDATE ${TableNames.PROGRAMS_MASTER_DATA_TABLE} SET ${updates.join(
      ", "
    )} WHERE Program_Code = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete program
const deleteProgram = async (program_code) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.PROGRAMS_MASTER_DATA_TABLE} WHERE Program_Code = ?`,
    [program_code]
  );

  if (result.affectedRows === 0) {
    throw new Error("Program not found");
  }

  return { message: "Program deleted successfully." };
};

export { createProgram, retrievePrograms, updateProgram, deleteProgram };
