import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

const getProgramEducationalObjectives = async (program_code, dept_code) => {
  let query = `
    SELECT 
      pmdt.*
    FROM ${TableNames.PEO_MASTER_DATA_TABLE} pmdt 
    LEFT JOIN ${TableNames.PROGRAMS_MASTER_DATA_TABLE} pmd 
    ON pmdt.Program_Code = pmd.Program_Code
    WHERE pmd.Program_Dept = ?
  `;

  const params = [dept_code];

  if (program_code !== null) {
    query += ` AND pmd.Program_Code LIKE ?`;
    params.push(`%${program_code}%`);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

// Create a new program objective
const createProgramEducationalObjective = async (
  programEducationalObjectives
) => {
  const {
    program_code,
    peo_desc,
    peo_status,
    peo_custom_field1,
    peo_custom_field2,
    peo_custom_field3,
  } = programEducationalObjectives;

  // Query to find the number of existing POs for the given program_code
  const [rows] = await pool.query(
    `SELECT COUNT(*) as peo_count FROM ${TableNames.PEO_MASTER_DATA_TABLE} WHERE Program_Code = ?`,
    [program_code]
  );

  const peoCount = rows[0].peo_count;

  // Generate PO Sequence Number in the desired format: BSIT-PEO-01
  const peo_seq_number = `${program_code}-PEO-${String(peoCount + 1).padStart(
    2,
    "0"
  )}`;

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

  if (peo_custom_field1) {
    updates.push("PEO_CustomField1 = ?");
    values.push(peo_custom_field1);
  }

  if (peo_custom_field2) {
    updates.push("PEO_CustomField2 = ?");
    values.push(peo_custom_field2);
  }

  if (peo_custom_field3) {
    updates.push("PEO_CustomField3 = ?");
    values.push(peo_custom_field3);
  }

  values.push(program_code, peo_seq_number);

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
  getProgramEducationalObjectives,
  updateProgramEducationalObjective,
  deleteProgramEducationalObjective,
};
