import {
  createCurriculum,
  checkCurriculum,
  updateCurriculum,
  deleteCurriculum,
} from "../models/CurriculumMasterDataModel.js";

// Get curriculum by program code and curriculum revision code
const getCurriculumController = async (req, res) => {
  const { program_code } = req.body;

  try {
    const data = await checkCurriculum(program_code);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Curriculum not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new curriculum
const createCurriculumController = async (req, res) => {
  const {
    program_code,
    curr_year,
    curr_rev_code,
    curr_status,
    curr_custom_field1,
    curr_custom_field2,
    curr_custom_field3,
  } = req.body;

  if (!program_code || !curr_rev_code) {
    return res.status(400).json({
      message: "Program code and curriculum revision code are required",
    });
  }

  try {
    // Check if the curriculum already exists
    const existingCurriculum = await checkCurriculum(program_code);
    if (existingCurriculum) {
      return res.status(400).json({ message: "Curriculum already exists" });
    }

    // Save the curriculum to the database
    const newCurriculum = await createCurriculum({
      program_code,
      curr_year,
      curr_rev_code,
      curr_status,
      curr_custom_field1,
      curr_custom_field2,
      curr_custom_field3,
    });

    res.status(201).json({
      message: "Curriculum created successfully",
      curriculum: newCurriculum,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing curriculum
const updateCurriculumController = async (req, res) => {
  const {
    program_code,
    curr_year,
    curr_rev_code,
    curr_status,
    curr_custom_field1,
    curr_custom_field2,
    curr_custom_field3,
  } = req.body;

  if (!program_code || !curr_rev_code) {
    return res.status(400).json({
      message: "Program code and curriculum revision code are required",
    });
  }

  const updatedFields = {
    curr_year,
    curr_status,
    curr_custom_field1,
    curr_custom_field2,
    curr_custom_field3,
  };

  try {
    const result = await updateCurriculum(
      program_code,
      curr_rev_code,
      updatedFields
    );
    if (result) {
      res.status(200).json({ message: "Curriculum updated successfully" });
    } else {
      res.status(404).json({ message: "Curriculum not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a curriculum
const deleteCurriculumController = async (req, res) => {
  const { program_code, curr_rev_code } = req.params;

  if (!program_code || !curr_rev_code) {
    return res.status(400).json({
      message: "Program code and curriculum revision code are required",
    });
  }

  try {
    await deleteCurriculum(program_code, curr_rev_code);
    res.status(200).json({ message: "Curriculum deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getCurriculumController,
  createCurriculumController,
  updateCurriculumController,
  deleteCurriculumController,
};
