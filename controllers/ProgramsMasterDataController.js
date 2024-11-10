import {
  createProgram,
  checkProgram,
  updateProgram,
  deleteProgram,
} from "../models/ProgramsMasterDataModel.js";

// Get program by department and title
const getProgramByDeptAndTitleController = async (req, res) => {
  const { programDept, programTitle } = req.body;
  try {
    const data = await checkProgram(programDept, programTitle);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new program
const createProgramController = async (req, res) => {
  const {
    program_code,
    program_title,
    program_dept,
    program_status,
    program_custom_field_1,
    program_custom_field_2,
    program_custom_field_3,
  } = req.body;

  if (!program_code || !program_title || !program_dept) {
    return res
      .status(400)
      .json({ message: "Program code, title, and department are required" });
  }

  try {
    // Check if the program already exists
    const existingProgram = await checkProgram(program_dept, program_title);
    if (existingProgram) {
      return res.status(400).json({ message: "Program already exists" });
    }

    // Save the program to the database
    const newProgram = await createProgram({
      program_code,
      program_title,
      program_dept,
      program_status,
      program_custom_field_1,
      program_custom_field_2,
      program_custom_field_3,
    });

    res.status(201).json({
      message: "Program registered successfully",
      program: newProgram,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a program
const updateProgramController = async (req, res) => {
  const { program_code, updatedFields } = req.body;

  if (!program_code) {
    return res.status(400).json({ message: "Program code is required" });
  }

  try {
    const result = await updateProgram(program_code, updatedFields);
    if (result) {
      res.status(200).json({ message: "Program updated successfully" });
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a program
const deleteProgramController = async (req, res) => {
  const { program_code } = req.body;

  if (!program_code) {
    return res.status(400).json({ message: "Program code is required" });
  }

  try {
    await deleteProgram(program_code);
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getProgramByDeptAndTitleController,
  createProgramController,
  updateProgramController,
  deleteProgramController,
};
