import pool from "../config/database.js";
import TableNames from "../constants/TableNames.js";

// Check if the PO-CILO mapping exists
const checkPoCiloMapping = async (programCode, ciloSeqNumber, poSeqNumber) => {
  const [rows] = await pool.query(
    `SELECT * FROM ${TableNames.PO_CILO_MAPPING_MATRIX_TABLE} WHERE Program_Code = ? 
    AND CILO_SeqNumber = ? AND PO_SeqNumber = ?`,
    [programCode, ciloSeqNumber, poSeqNumber]
  );
  return rows[0];
};

// Create a new PO-CILO mapping
const createPoCiloMapping = async (poCiloMapping) => {
  const {
    program_code,
    curr_course_code,
    cilo_seq_number,
    po_seq_number,
    po_cilo_activation_code,
    po_cilo_status,
    po_cilo_custom_field_1,
    po_cilo_custom_field_2,
    po_cilo_custom_field_3,
  } = poCiloMapping;

  // Check if the PO-CILO mapping already exists
  const existingPoMapping = await checkPoCiloMapping(
    program_code,
    cilo_seq_number,
    po_seq_number
  );

  if (existingPoMapping) {
    return { message: "PO-CILO mapping already exists" };
  }

  // Create new PO-CILO mapping
  const [result] = await pool.query(
    `INSERT INTO ${TableNames.PO_CILO_MAPPING_MATRIX_TABLE} 
    (Program_Code, Curr_Course_Code, CILO_SeqNumber,
    PO_SeqNumber, PO_CILO_Activation_Code, PO_CILO_Status, 
    PO_CILO_CustomField1, PO_CILO_CustomField2, PO_CILO_CustomField3)
    VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      program_code,
      curr_course_code,
      cilo_seq_number,
      po_seq_number,
      po_cilo_activation_code,
      po_cilo_status,
      po_cilo_custom_field_1,
      po_cilo_custom_field_2,
      po_cilo_custom_field_3,
    ]
  );

  return { id: result.insertId, poCiloMapping };
};

// Update PO-CILO mapping details
const updatePoCiloMapping = async (
  program_code,
  cilo_seq_number,
  po_seq_number,
  updatedFields
) => {
  const {
    po_cilo_activation_code,
    curr_course_code,
    po_cilo_status,
    po_cilo_custom_field1,
    po_cilo_custom_field2,
    po_cilo_custom_field3,
  } = updatedFields;

  // Check if the PO-CILO mapping exists
  const existingPoCiloMapping = await checkPoCiloMapping(
    program_code,
    cilo_seq_number,
    po_seq_number
  );

  if (!existingPoCiloMapping) {
    throw new Error("PO-CILO mapping not found");
  }

  const updates = [];
  const values = [];

  if (curr_course_code) {
    updates.push("Curr_Course_Code = ?");
    values.push(curr_course_code);
  }

  if (po_cilo_activation_code) {
    updates.push("PO_CILO_Activation_Code = ?");
    values.push(po_cilo_activation_code);
  }

  if (po_cilo_status) {
    updates.push("PO_CILO_Status = ?");
    values.push(po_cilo_status);
  }

  if (po_cilo_custom_field1) {
    updates.push("PO_CILO_CustomField1 = ?");
    values.push(po_cilo_custom_field1);
  }

  if (po_cilo_custom_field2) {
    updates.push("PO_CILO_CustomField2 = ?");
    values.push(po_cilo_custom_field2);
  }

  if (po_cilo_custom_field3) {
    updates.push("PO_CILO_CustomField3 = ?");
    values.push(po_cilo_custom_field3);
  }

  values.push(program_code, cilo_seq_number, po_seq_number);

  const [result] = await pool.query(
    `UPDATE ${TableNames.PO_CILO_MAPPING_MATRIX_TABLE} SET ${updates.join(
      ", "
    )} 
    WHERE Program_Code = ? AND CILO_SeqNumber = ? AND PO_SeqNumber = ?`,
    values
  );

  return result.affectedRows > 0;
};

// Delete PO-CILO mapping
const deletePoCiloMapping = async (programCode, ciloSeqNumber, poSeqNumber) => {
  const [result] = await pool.query(
    `DELETE FROM ${TableNames.PO_CILO_MAPPING_MATRIX_TABLE} 
    WHERE Program_Code = ? AND CILO_SeqNumber = ? AND PO_SeqNumber = ?`,
    [programCode, ciloSeqNumber, poSeqNumber]
  );

  if (result.affectedRows === 0) {
    throw new Error("PO-CILO mapping not found");
  }

  return { message: "PO-CILO mapping deleted successfully." };
};

export {
  createPoCiloMapping,
  checkPoCiloMapping,
  updatePoCiloMapping,
  deletePoCiloMapping,
};
