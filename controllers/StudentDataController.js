import { UserIdGenerator } from "../misc/IdGenerators.js";
import {
  getProgramsData,
  getStudentsData,
  getTermsData,
  getProgramOutcomesData
} from "../models/StudentsDataModel.js";
import bcrypt from "bcrypt";

// get user by username controller
const getStudentDataController = async (req, res) => {
  //res.status(200).json({test: "test"});
  const { coursecode, term } = req.body;
  try {
    const data = await getStudentsData(coursecode, term);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgramsController = async (req, res) => {
  try {
    const data = await getProgramsData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTermsController = async (req, res) => {
  try {
    const { coursecode } = req.body;
    const data = await getTermsData(coursecode);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProgramOutComesController = async (req, res) => {
  try {
    const { idnumber,coursecode } = req.body;
    const data = await getProgramOutcomesData(idnumber, coursecode);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProgramOutComesCoursesController = async (req, res) => {
  try {
    const data = await getProgramOutcomesCoursesData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
    getStudentDataController,getProgramsController, getTermsController,getProgramOutComesController,
    getProgramOutComesCoursesController
};
