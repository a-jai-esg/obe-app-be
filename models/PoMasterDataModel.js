import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

// Check if the program objective exists
const checkProgramObjectives = async (programCode, poSeqNumber) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.PO_MASTER_DATA_TABLE} WHERE Program_Code = ? AND PO_SeqNumber = ?`,
    [programCode, poSeqNumber]
  );
  return rows[0];
};

// Create a new program objective
const createProgramObjective = async (programObjectives) => {
  const {
    program_code,
    po_seq_number,
    po_desc,
    po_status,
    po_custom_field_1,
    po_custom_field_2,
    po_custom_field_3,
  } = programObjectives;

  // Check if the program objective already exists
  const existingProgramObjective = await checkProgramObjectives(
    program_code,
    po_seq_number
  );

  if (existingProgramObjective) {
    return { message: "Program objective already exists" };
  }

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
      po_custom_field_1,
      po_custom_field_2,
      po_custom_field_3,
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
    po_custom_field_1,
    po_custom_field_2,
    po_custom_field_3,
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

  if (po_custom_field_1) {
    updates.push("PO_CustomField1 = ?");
    values.push(po_custom_field_1);
  }

  if (po_custom_field_2) {
    updates.push("PO_CustomField2 = ?");
    values.push(po_custom_field_2);
  }

  if (po_custom_field_3) {
    updates.push("PO_CustomField3 = ?");
    values.push(po_custom_field_3);
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
const deleteProgramObjective = async (programCode, poSeqNumber) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.PO_MASTER_DATA_TABLE} WHERE Program_Code = ? AND PO_SeqNumber = ?`,
    [programCode, poSeqNumber]
  );

  if (result.affectedRows === 0) {
    throw new Error("Program objective not found");
  }

  return { message: "Program objective deleted successfully." };
};

export {
  createProgramObjective,
  checkProgramObjectives,
  updateProgramObjective,
  deleteProgramObjective,
};
