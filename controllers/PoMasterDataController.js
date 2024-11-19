import {
  createProgramObjective,
  getProgramObjectives,
  updateProgramObjective,
  deleteProgramObjective,
} from "../models/PoMasterDataModel.js";

// Get program educational objective by program code
const getProgramObjectivesController = async (req, res) => {
  const { programCode } = req.body;

  try {
    const data = await getProgramObjectives(programCode);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Program objective/s not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new program objective
const createProgramObjectiveController = async (req, res) => {
  const {
    program_code,
    po_desc,
    po_status,
    po_custom_field1,
    po_custom_field2,
    po_custom_field3,
  } = req.body;

  if (!program_code) {
    return res
      .status(400)
      .json({ message: "Program code and sequence number are required" });
  }

  try {
    // Save the program objective to the database
    const newProgramObjective = await createProgramObjective({
      program_code,
      po_desc,
      po_status,
      po_custom_field1,
      po_custom_field2,
      po_custom_field3,
    });

    res.status(201).json({
      message: "Program objective registered successfully",
      programObjective: newProgramObjective,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a program objective
const updateProgramObjectiveController = async (req, res) => {
  const { program_code, po_seq_number, updatedFields } = req.body;

  if (!program_code || !po_seq_number) {
    return res
      .status(400)
      .json({ message: "Program code and sequence number are required" });
  }

  try {
    const result = await updateProgramObjective(
      program_code,
      po_seq_number,
      updatedFields
    );
    if (result) {
      res
        .status(200)
        .json({ message: "Program objective updated successfully" });
    } else {
      res.status(404).json({ message: "Program objective not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a program objective
const deleteProgramObjectiveController = async (req, res) => {
  const { program_code, po_seq_number } = req.body;

  if (!program_code || !po_seq_number) {
    return res
      .status(400)
      .json({ message: "Program code and sequence number are required" });
  }

  try {
    await deleteProgramObjective(program_code, po_seq_number);
    res.status(200).json({ message: "Program objective deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createProgramObjectiveController,
  getProgramObjectivesController,
  updateProgramObjectiveController,
  deleteProgramObjectiveController,
};
