import {
  createPoCiloMapping,
  checkPoCiloMapping,
  updatePoCiloMapping,
  deletePoCiloMapping,
} from "../models/PoCiloMappingMatrixModel.js";

// Get PO-CILO mapping by program code, CILO sequence number, and PO sequence number
const getPoCiloMappingController = async (req, res) => {
  const { programCode, ciloSeqNumber, poSeqNumber } = req.body;
  try {
    const data = await checkPoCiloMapping(
      programCode,
      ciloSeqNumber,
      poSeqNumber
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "PO-CILO mapping not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new PO-CILO mapping
const createPoCiloMappingController = async (req, res) => {
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
  } = req.body;

  if (!program_code || !cilo_seq_number || !po_seq_number) {
    return res.status(400).json({
      message:
        "Program code, CILO sequence number, and PO sequence number are required",
    });
  }

  try {
    // Check if the PO-CILO mapping already exists
    const existingPoMapping = await checkPoCiloMapping(
      program_code,
      cilo_seq_number,
      po_seq_number
    );
    if (existingPoMapping) {
      return res
        .status(400)
        .json({ message: "PO-CILO mapping already exists" });
    }

    // Save the PO-CILO mapping to the database
    const newPoCiloMapping = await createPoCiloMapping({
      program_code,
      curr_course_code,
      cilo_seq_number,
      po_seq_number,
      po_cilo_activation_code,
      po_cilo_status,
      po_cilo_custom_field_1,
      po_cilo_custom_field_2,
      po_cilo_custom_field_3,
    });

    res.status(201).json({
      message: "PO-CILO mapping registered successfully",
      poCiloMapping: newPoCiloMapping,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a PO-CILO mapping
const updatePoCiloMappingController = async (req, res) => {
  const { program_code, cilo_seq_number, po_seq_number, updatedFields } =
    req.body;

  if (!program_code || !cilo_seq_number || !po_seq_number) {
    return res.status(400).json({
      message:
        "Program code, CILO sequence number, and PO sequence number are required",
    });
  }

  try {
    const result = await updatePoCiloMapping(
      program_code,
      cilo_seq_number,
      po_seq_number,
      updatedFields
    );
    if (result) {
      res.status(200).json({ message: "PO-CILO mapping updated successfully" });
    } else {
      res.status(404).json({ message: "PO-CILO mapping not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a PO-CILO mapping
const deletePoCiloMappingController = async (req, res) => {
  const { program_code, cilo_seq_number, po_seq_number } = req.body;

  if (!program_code || !cilo_seq_number || !po_seq_number) {
    return res.status(400).json({
      message:
        "Program code, CILO sequence number, and PO sequence number are required",
    });
  }

  try {
    await deletePoCiloMapping(program_code, cilo_seq_number, po_seq_number);
    res.status(200).json({ message: "PO-CILO mapping deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getPoCiloMappingController,
  createPoCiloMappingController,
  updatePoCiloMappingController,
  deletePoCiloMappingController,
};
