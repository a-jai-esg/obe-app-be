import {
  createPeoPoMapping,
  checkPeoPoMapping,
  updatePeoPoMapping,
  deletePeoPoMapping,
} from "../models/PeoPoMappingMatrixModel.js";

// Get PEO-PO mapping by program code, PEO sequence number, and PO sequence number
const getPeoPoMappingController = async (req, res) => {
  const { program_code, peo_seq_number, po_seq_number } = req.body;
  try {
    const data = await checkPeoPoMapping(
      program_code,
      peo_seq_number,
      po_seq_number
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "PEO-PO mapping not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new PEO-PO mapping
const createPeoPoMappingController = async (req, res) => {
  const {
    program_code,
    curr_course_code,
    peo_seq_number,
    po_seq_number,
    peo_po_activation_code,
    peo_po_status,
    peo_po_custom_field1,
    peo_po_custom_field2,
    peo_po_custom_field3,
  } = req.body;

  if (!program_code || !peo_seq_number || !po_seq_number) {
    return res.status(400).json({
      message:
        "Program code, PEO sequence number, and PO sequence number are required",
    });
  }

  try {
    // Check if the PEO-PO mapping already exists
    const existingPeoPoMapping = await checkPeoPoMapping(
      program_code,
      peo_seq_number,
      po_seq_number
    );
    if (existingPeoPoMapping) {
      return res.status(400).json({ message: "PEO-PO mapping already exists" });
    }

    // Save the PEO-PO mapping to the database
    const newPeoPoMapping = await createPeoPoMapping({
      program_code,
      curr_course_code,
      peo_seq_number,
      po_seq_number,
      peo_po_activation_code,
      peo_po_status,
      peo_po_custom_field1,
      peo_po_custom_field2,
      peo_po_custom_field3,
    });

    res.status(201).json({
      message: "PEO-PO mapping registered successfully",
      peoPoMapping: newPeoPoMapping,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a PEO-PO mapping
const updatePeoPoMappingController = async (req, res) => {
  const { program_code, peo_seq_number, po_seq_number, updatedFields } =
    req.body;

  if (!program_code || !peo_seq_number || !po_seq_number) {
    return res.status(400).json({
      message:
        "Program code, PEO sequence number, and PO sequence number are required",
    });
  }

  try {
    const result = await updatePeoPoMapping(
      program_code,
      peo_seq_number,
      po_seq_number,
      updatedFields
    );
    if (result) {
      res.status(200).json({ message: "PEO-PO mapping updated successfully" });
    } else {
      res.status(404).json({ message: "PEO-PO mapping not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a PEO-PO mapping
const deletePeoPoMappingController = async (req, res) => {
  const { program_code, peo_seq_number, po_seq_number } = req.body;

  if (!program_code || !peo_seq_number || !po_seq_number) {
    return res.status(400).json({
      message:
        "Program code, PEO sequence number, and PO sequence number are required",
    });
  }

  try {
    await deletePeoPoMapping(program_code, peo_seq_number, po_seq_number);
    res.status(200).json({ message: "PEO-PO mapping deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getPeoPoMappingController,
  createPeoPoMappingController,
  updatePeoPoMappingController,
  deletePeoPoMappingController,
};
