import {
  getCoursesCilosByCiloAndCourseCode,
  createCoursesCilos,
  updateCoursesCilos,
  deleteCoursesCilos,
} from "../models/CoursesCilosDataModel.js";

// Get courses CILOs by CILO code and course code
const getCoursesCilosController = async (req, res) => {
  const { ciloCode, currCourseCode } = req.params;

  try {
    const data = await getCoursesCilosByCiloAndCourseCode(
      ciloCode,
      currCourseCode
    );
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Courses CILOs not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register new courses CILOs
const createCoursesCilosController = async (req, res) => {
  const {
    cilo_code,
    curr_course_code,
    cilo_desc,
    cilo_status,
    cilo_customfield1,
    cilo_customfield2,
    cilo_customfield3,
  } = req.body;

  if (!cilo_code || !curr_course_code) {
    return res.status(400).json({
      message: "CILO code and course code are required",
    });
  }

  try {
    // Save the courses CILOs to the database
    const newCoursesCilos = await createCoursesCilos({
      cilo_code,
      curr_course_code,
      cilo_desc,
      cilo_status,
      cilo_customfield1,
      cilo_customfield2,
      cilo_customfield3,
    });

    res.status(201).json({
      message: "Courses CILOs created successfully",
      coursesCilos: newCoursesCilos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update courses CILOs details
const updateCoursesCilosController = async (req, res) => {
  const { ciloCode, currCourseCode } = req.params;
  const updatedFields = req.body;

  if (!ciloCode || !currCourseCode) {
    return res.status(400).json({
      message: "CILO code and course code are required",
    });
  }

  try {
    const result = await updateCoursesCilos(
      ciloCode,
      currCourseCode,
      updatedFields
    );
    if (result) {
      res.status(200).json({ message: "Courses CILOs updated successfully" });
    } else {
      res.status(404).json({ message: "Courses CILOs not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a courses CILOs
const deleteCoursesCilosController = async (req, res) => {
  const { ciloCode, currCourseCode } = req.params;

  if (!ciloCode || !currCourseCode) {
    return res.status(400).json({
      message: "CILO code and course code are required",
    });
  }

  try {
    await deleteCoursesCilos(ciloCode, currCourseCode);
    res.status(200).json({ message: "Courses CILOs deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getCoursesCilosController,
  createCoursesCilosController,
  updateCoursesCilosController,
  deleteCoursesCilosController,
};
