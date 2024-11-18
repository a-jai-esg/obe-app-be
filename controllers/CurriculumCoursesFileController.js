import {
  getCurriculumCourses,
  createCurriculumCourses,
  updateCurriculumCourses,
  deleteCurriculumCourses,
} from "../models/CurriculumCoursesFileModel.js";

// Get curriculum course by revision code and course code
const getCurriculumCoursesController = async (req, res) => {
  const { program_code, dept_code } = req.body;

  try {
    const data = await getCurriculumCourses(program_code, dept_code);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Curriculum course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new curriculum course
const createCurriculumCoursesController = async (req, res) => {
  const {
    curr_rev_code,
    curr_course_code,
    curr_course_desc,
    curr_year,
    curr_sem,
    curr_units,
    curr_lec_hrs,
    curr_lab_hrs,
    curr_status,
    curr_crs_customfield1,
    curr_crs_customfield2,
    curr_crs_customfield3,
  } = req.body;

  if (!curr_rev_code || !curr_course_code) {
    return res.status(400).json({
      message: "Curriculum revision code and course code are required",
    });
  }

  try {
    // Save the curriculum course to the database
    const newCurriculumCourse = await createCurriculumCourses({
      curr_rev_code,
      curr_course_code,
      curr_course_desc,
      curr_year,
      curr_sem,
      curr_units,
      curr_lec_hrs,
      curr_lab_hrs,
      curr_status,
      curr_crs_customfield1,
      curr_crs_customfield2,
      curr_crs_customfield3,
    });

    res.status(201).json({
      message: "Curriculum course created successfully",
      curriculumCourse: newCurriculumCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update curriculum course details
const updateCurriculumCoursesController = async (req, res) => {
  const {
    curr_rev_code,
    curr_course_code,
    curr_course_desc,
    curr_year,
    curr_sem,
    curr_units,
    curr_lec_hrs,
    curr_lab_hrs,
    curr_status,
    curr_crs_customfield1,
    curr_crs_customfield2,
    curr_crs_customfield3,
  } = req.body;

  if (!curr_rev_code || !curr_course_code) {
    return res.status(400).json({
      message: "Curriculum revision code and course code are required",
    });
  }

  const updatedFields = {
    curr_course_desc,
    curr_year,
    curr_sem,
    curr_units,
    curr_lec_hrs,
    curr_lab_hrs,
    curr_status,
    curr_crs_customfield1,
    curr_crs_customfield2,
    curr_crs_customfield3,
  };

  try {
    const result = await updateCurriculumCourses(
      curr_rev_code,
      curr_course_code,
      updatedFields
    );
    if (result) {
      res
        .status(200)
        .json({ message: "Curriculum course updated successfully" });
    } else {
      res.status(404).json({ message: "Curriculum course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a curriculum course
const deleteCurriculumCoursesController = async (req, res) => {
  const { curr_rev_code, curr_course_code } = req.params;

  if (!curr_rev_code || !curr_course_code) {
    return res.status(400).json({
      message: "Curriculum revision code and course code are required",
    });
  }

  try {
    await deleteCurriculumCourses(curr_rev_code, curr_course_code);
    res.status(200).json({ message: "Curriculum course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getCurriculumCoursesController,
  createCurriculumCoursesController,
  updateCurriculumCoursesController,
  deleteCurriculumCoursesController,
};
