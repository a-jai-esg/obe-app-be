import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

// Check if the program objective exists
const checkProgramEducationalObjectives = async (programCode, peoSeqNumber) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.PEO_MASTER_DATA_TABLE} WHERE Program_Code = ? AND PEO_SeqNumber = ?`,
    [programCode, peoSeqNumber]
  );
  return rows[0];
};

// Create a new program objective
const createProgramEducationalObjective = async (
  programEducationalObjectives
) => {
  const {
    program_code,
    peo_seq_number,
    peo_desc,
    peo_status,
    peo_custom_field1,
    peo_custom_field2,
    peo_custom_field3,
  } = programEducationalObjectives;

  // Check if the program objective already exists
  const existingProgramEducationalObjective =
    await checkProgramEducationalObjectives(program_code, peo_seq_number);

  if (existingProgramEducationalObjective) {
    return { message: "Program educational objective already exists" };
  }

  // Create new program objective
  const [result] = await pool.query(
    `INSERT INTO ${TableNames.PEO_MASTER_DATA_TABLE} 
    (Program_Code, PEO_SeqNumber, PEO_Desc,
    PEO_Status, PEO_CustomField1, PEO_CustomField2, PEO_CustomField3)
    VALUES (?,?,?,?,?,?,?)`,
    [
      program_code,
      peo_seq_number,
      peo_desc,
      peo_status,
      peo_custom_field1,
      peo_custom_field2,
      peo_custom_field3,
    ]
  );

  return { id: result.insertId, programEducationalObjectives };
};

// Update program objective details
const updateProgramEducationalObjective = async (
  program_code,
  peo_seq_number,
  updatedFields
) => {
  const {
    peo_desc,
    peo_status,
    peo_custom_field1,
    peo_custom_field2,
    peo_custom_field3,
  } = updatedFields;

  // Check if the program objective exists
  const existingProgramEducationalObjective =
    await checkProgramEducationalObjectives(program_code, peo_seq_number);

  if (!existingProgramEducationalObjective) {
    throw new Error("Program educational objective not found");
  }

  const updates = [];
  const values = [];

  if (peo_desc) {
    updates.push("PEO_Desc = ?");
    values.push(peo_desc);
  }

  if (peo_status) {
    updates.push("PEO_Status = ?");
    values.push(peo_status);
  }

  if (peo_custom_field_1) {
    updates.push("PEO_CustomField1 = ?");
    values.push(peo_custom_field1);
  }

  if (peo_custom_field_2) {
    updates.push("PEO_CustomField2 = ?");
    values.push(peo_custom_field2);
  }

  if (peo_custom_field_3) {
    updates.push("PEO_CustomField3 = ?");
    values.push(peo_custom_field3);
  }

  values.push(programCode, peoSeqNumber);

  const [result] = await pool.query(
    `UPDATE ${TableNames.PEO_MASTER_DATA_TABLE} SET ${updates.join(", ")} 
    WHERE Program_Code = ? AND PEO_SeqNumber = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete program objective
const deleteProgramEducationalObjective = async (
  program_code,
  peo_seq_number
) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.PEO_MASTER_DATA_TABLE} WHERE Program_Code = ? AND PEO_SeqNumber = ?`,
    [program_code, peo_seq_number]
  );

  if (result.affectedRows === 0) {
    throw new Error("Program educational objective not found");
  }

  return { message: "Program educational objective deleted successfully." };
};

export {
  createProgramEducationalObjective,
  checkProgramEducationalObjectives,
  updateProgramEducationalObjective,
  deleteProgramEducationalObjective,
};
