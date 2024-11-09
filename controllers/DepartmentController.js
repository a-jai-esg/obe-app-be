// controllers/DepartmentController.js
import {
  getDepartmentsData,
  getDepartmentById,
} from "../models/DepartmentModel.js";

const getDepartmentsDataController = async (req, res) => {
  try {
    const data = await getDepartmentsData();

    const filteredData = data.map((department) => {
      return {
        Record_ID: department.Record_ID,
        Department_Code: department.Department_Code,
      };
    });

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const getDepartmentByIdController = async (req, res) => {
  const { department_id } = req.body;

  try {
    const data = await getDepartmentById(department_id);
    const filteredData = data.map((department) => {
      return {
        Department_Code: department.Department_Code,
        Department_Name: department.Department_Name,
      };
    });

    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

export { getDepartmentsDataController, getDepartmentByIdController };
