import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

const getProgramObjectives = async (programCode) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.PEO_MASTER_DATA_TABLE} WHERE Program_Code = ?`,
    [programCode]
  );
  return rows[0];
};

// Create a new program objective
const createProgramObjective = async (programObjectives) => {
  const {
    program_code,
    po_desc,
    po_status,
    po_custom_field1,
    po_custom_field2,
    po_custom_field3,
  } = programObjectives;

  // Query to find the number of existing POs for the given program_code
  const [rows] = await pool.query(
    `SELECT COUNT(*) as po_count FROM ${TableNames.PO_MASTER_DATA_TABLE} WHERE Program_Code = ?`,
    [program_code]
  );

  const poCount = rows[0].po_count;

  // Generate PO Sequence Number in the desired format: BSIT-PEO-01
  const po_seq_number = `${program_code}-PO-${String(poCount + 1).padStart(
    2,
    "0"
  )}`;

  // Create new program objective
  const [result] = await pool.query(
    `INSERT INTO ${TableNames.PO_MASTER_DATA_TABLE} 
    (Program_Code, PO_SeqNumber, PO_Desc,
    PO_Status, PO_CustomField1, PO_CustomField2, PO_CustomField3)
    VALUES (?,?,?,?,?,?,?)`,
    [
      program_code,
      po_seq_number,
      po_desc,
      po_status,
      po_custom_field1,
      po_custom_field2,
      po_custom_field3,
    ]
  );

  return { id: result.insertId, programObjectives };
};

// Update program objective details
const updateProgramObjective = async (
  programCode,
  poSeqNumber,
  updatedFields
) => {
  const {
    po_desc,
    po_status,
    po_custom_field1,
    po_custom_field2,
    po_custom_field3,
  } = updatedFields;

  // Check if the program objective exists
  const existingProgramObjective = await checkProgramObjectives(
    programCode,
    poSeqNumber
  );

  if (!existingProgramObjective) {
    throw new Error("Program objective not found");
  }

  const updates = [];
  const values = [];

  if (po_desc) {
    updates.push("PO_Desc = ?");
    values.push(po_desc);
  }

  if (po_status) {
    updates.push("PO_Status = ?");
    values.push(po_status);
  }

  if (po_custom_field1) {
    updates.push("PO_CustomField1 = ?");
    values.push(po_custom_field1);
  }

  if (po_custom_field2) {
    updates.push("PO_CustomField2 = ?");
    values.push(po_custom_field2);
  }

  if (po_custom_field3) {
    updates.push("PO_CustomField3 = ?");
    values.push(po_custom_field3);
  }

  values.push(programCode, poSeqNumber);

  const [result] = await pool.query(
    `UPDATE ${TableNames.PO_MASTER_DATA_TABLE} SET ${updates.join(", ")} 
    WHERE Program_Code = ? AND PO_SeqNumber = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete program objective
const deleteProgramObjective = async (program_code, po_seq_number) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.PO_MASTER_DATA_TABLE} WHERE Program_Code = ? AND PO_SeqNumber = ?`,
    [program_code, po_seq_number]
  );

  if (result.affectedRows === 0) {
    throw new Error("Program objective not found");
  }

  return { message: "Program objective deleted successfully." };
};

export {
  createProgramObjective,
  getProgramObjectives,
  updateProgramObjective,
  deleteProgramObjective,
};
