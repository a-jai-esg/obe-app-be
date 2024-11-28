import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

// Check if the PEO-PO mapping exists
const checkPeoPoMapping = async (programCode, peoSeqNumber, poSeqNumber) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.PEO_PO_MAPPING_MATRIX_TABLE} WHERE Program_Code = ? 
    AND PEO_SeqNumber = ? AND PO_SeqNumber = ?`,
    [programCode, peoSeqNumber, poSeqNumber]
  );
  return rows[0];
};

// Create a new PEO-PO mapping
const createPeoPoMapping = async (peoPoMapping) => {
  const {
    program_code,
    peo_seq_number,
    po_seq_number,
    peo_po_activation_code,
    peo_po_status,
    peo_po_custom_field1,
    peo_po_custom_field2,
    peo_po_custom_field3,
  } = peoPoMapping;

  // Check if the PEO-PO mapping already exists
  const existingPeoPoMapping = await checkPeoPoMapping(
    program_code,
    peo_seq_number,
    po_seq_number
  );

  if (existingPeoPoMapping) {
    return { message: "PEO-PO mapping already exists" };
  }

  // Create new PEO-PO mapping
  const [result] = await pool.query(
    `INSERT INTO ${TableNames.PEO_PO_MAPPING_MATRIX_TABLE} 
    (Program_Code, PEO_SeqNumber, PO_SeqNumber,
    PEO_PO_Activation_Code, PEO_PO_Status, 
    PEO_PO_CustomField1, PEO_PO_CustomField2, PEO_PO_CustomField3)
    VALUES (?,?,?,?,?,?,?,?)`,
    [
      program_code,
      peo_seq_number,
      po_seq_number,
      peo_po_activation_code,
      peo_po_status,
      peo_po_custom_field1,
      peo_po_custom_field2,
      peo_po_custom_field3,
    ]
  );

  return { id: result.insertId, peoPoMapping };
};

// Update PEO-PO mapping details
const updatePeoPoMapping = async (
  program_code,
  peo_seq_number,
  po_seq_number,
  updatedFields
) => {
  const {
    peo_po_activation_code,
    peo_po_status,
    peo_po_custom_field1,
    peo_po_custom_field2,
    peo_po_custom_field3,
  } = updatedFields;

  // Check if the PEO-PO mapping exists
  const existingPeoPoMapping = await checkPeoPoMapping(
    program_code,
    peo_seq_number,
    po_seq_number
  );

  if (!existingPeoPoMapping) {
    throw new Error("PEO-PO mapping not found");
  }

  const updates = [];
  const values = [];

  if (peo_po_activation_code) {
    updates.push("PEO_PO_Activation_Code = ?");
    values.push(peo_po_activation_code);
  }

  if (peo_po_status) {
    updates.push("PEO_PO_Status = ?");
    values.push(peo_po_status);
  }

  if (peo_po_custom_field1) {
    updates.push("PEO_PO_CustomField1 = ?");
    values.push(peo_po_custom_field1);
  }

  if (peo_po_custom_field2) {
    updates.push("PEO_PO_CustomField2 = ?");
    values.push(peo_po_custom_field2);
  }

  if (peo_po_custom_field3) {
    updates.push("PEO_PO_CustomField3 = ?");
    values.push(peo_po_custom_field3);
  }

  values.push(program_code, peo_seq_number, po_seq_number);

  const [result] = await pool.query(
    `UPDATE ${TableNames.PEO_PO_MAPPING_MATRIX_TABLE} SET ${updates.join(", ")} 
    WHERE Program_Code = ? AND PEO_SeqNumber = ? AND PO_SeqNumber = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete PEO-PO mapping
const deletePeoPoMapping = async (
  program_code,
  peo_seq_number,
  po_seq_number
) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.PEO_PO_MAPPING_MATRIX_TABLE} 
    WHERE Program_Code = ? AND PEO_SeqNumber = ? AND PO_SeqNumber = ?`,
    [program_code, peo_seq_number, po_seq_number]
  );

  if (result.affectedRows === 0) {
    throw new Error("PEO-PO mapping not found");
  }

  return { message: "PEO-PO mapping deleted successfully." };
};

export {
  createPeoPoMapping,
  checkPeoPoMapping,
  updatePeoPoMapping,
  deletePeoPoMapping,
};
