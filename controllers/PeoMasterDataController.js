import {
  createProgramEducationalObjective,
  checkProgramEducationalObjectives,
  updateProgramEducationalObjective,
  deleteProgramEducationalObjective,
} from "../models/PeoMasterDataModel.js";

// Get program educational objective by program code and PEO sequence number
const getProgramEducationalObjectiveController = async (req, res) => {
  const { programCode, peoSeqNumber } = req.params;

  try {
    const data = await checkProgramEducationalObjectives(
      programCode,
      peoSeqNumber
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ message: "Program educational objective not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new program educational objective
const createProgramEducationalObjectiveController = async (req, res) => {
  const {
    program_code,
    peo_seq_number,
    peo_desc,
    peo_status,
    peo_custom_field1,
    peo_custom_field2,
    peo_custom_field3,
  } = req.body;

  if (!program_code || !peo_seq_number) {
    return res.status(400).json({
      message: "Program code and PEO sequence number are required",
    });
  }

  try {
    // Check if the program educational objective already exists
    const existingPeo = await checkProgramEducationalObjectives(
      program_code,
      peo_seq_number
    );
    if (existingPeo) {
      return res
        .status(400)
        .json({ message: "Program educational objective already exists" });
    }

    // Save the program educational objective to the database
    const newPeo = await createProgramEducationalObjective({
      program_code,
      peo_seq_number,
      peo_desc,
      peo_status,
      peo_custom_field1,
      peo_custom_field2,
      peo_custom_field3,
    });

    res.status(201).json({
      message: "Program educational objective created successfully",
      programEducationalObjective: newPeo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a program educational objective
const updateProgramEducationalObjectiveController = async (req, res) => {
  const { program_code, peo_seq_number } = req.params;
  const updatedFields = req.body;

  if (!program_code || !peo_seq_number) {
    return res.status(400).json({
      message: "Program code and PEO sequence number are required",
    });
  }

  try {
    const result = await updateProgramEducationalObjective(
      program_code,
      peo_seq_number,
      updatedFields
    );
    if (result) {
      res.status(200).json({
        message: "Program educational objective updated successfully",
      });
    } else {
      res
        .status(404)
        .json({ message: "Program educational objective not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a program educational objective
const deleteProgramEducationalObjectiveController = async (req, res) => {
  const { program_code, peo_seq_number } = req.params;

  if (!program_code || !peo_seq_number) {
    return res.status(400).json({
      message: "Program code and PEO sequence number are required",
    });
  }

  try {
    await deleteProgramEducationalObjective(program_code, peo_seq_number);
    res
      .status(200)
      .json({ message: "Program educational objective deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getProgramEducationalObjectiveController,
  createProgramEducationalObjectiveController,
  updateProgramEducationalObjectiveController,
  deleteProgramEducationalObjectiveController,
};
