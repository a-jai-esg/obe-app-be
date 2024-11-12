import express from "express";
import { authenticateJwt } from "../middleware/authenticateJwt.js";

// controllers
import {
  createProgramController,
  getProgramByDeptController,
  updateProgramController,
  deleteProgramController,
} from "../controllers/ProgramsMasterDataController.js";

import {
  createProgramObjectiveController,
  getProgramObjectiveController,
  updateProgramObjectiveController,
  deleteProgramObjectiveController,
} from "../controllers/PoMasterDataController.js";

import {
  createPoCiloMappingController,
  getPoCiloMappingController,
  updatePoCiloMappingController,
  deletePoCiloMappingController,
} from "../controllers/PoCiloMappingMatrixController.js";

import {
  createPeoPoMappingController,
  getPeoPoMappingController,
  updatePeoPoMappingController,
  deletePeoPoMappingController,
} from "../controllers/PeoPoMappingMatrixController.js";

import {
  createProgramEducationalObjectiveController,
  getProgramEducationalObjectiveController,
  updateProgramEducationalObjectiveController,
  deleteProgramEducationalObjectiveController,
} from "../controllers/PeoMasterDataController.js";

import {
  createCurriculumController,
  getCurriculumController,
  updateCurriculumController,
  deleteCurriculumController,
} from "../controllers/CurriculumMasterDataController.js";

import {
  createCurriculumCoursesController,
  getCurriculumCoursesController,
  updateCurriculumCoursesController,
  deleteCurriculumCoursesController,
} from "../controllers/CurriculumCoursesFileController.js";

import {
  createCoursesCilosController,
  getCoursesCilosController,
  updateCoursesCilosController,
  deleteCoursesCilosController,
} from "../controllers/CoursesCilosDataController.js";

const systemRoutes = express.Router();

// programs-master-related
systemRoutes.post(
  "/programs-master/create",
  authenticateJwt,
  createProgramController
);

systemRoutes.post(
  "/programs-master/read",
  authenticateJwt,
  getProgramByDeptController
);

systemRoutes.post(
  "/programs-master/update",
  authenticateJwt,
  updateProgramController
);
systemRoutes.post(
  "/programs-master/delete",
  authenticateJwt,
  deleteProgramController
);

// po-master-related
systemRoutes.post(
  "/po-master/create",
  authenticateJwt,
  createProgramObjectiveController
);
systemRoutes.post(
  "/po-master/read",
  authenticateJwt,
  getProgramObjectiveController
);
systemRoutes.post(
  "/po-master/update",
  authenticateJwt,
  updateProgramObjectiveController
);
systemRoutes.post(
  "/po-master/delete",
  authenticateJwt,
  deleteProgramObjectiveController
);

// po-cilo-master-related
systemRoutes.post(
  "/po-cilo-master/create",
  authenticateJwt,
  createPoCiloMappingController
);
systemRoutes.post(
  "/po-cilo-master/read",
  authenticateJwt,
  getPoCiloMappingController
);
systemRoutes.post(
  "/po-cilo-master/update",
  authenticateJwt,
  updatePoCiloMappingController
);
systemRoutes.post(
  "/po-cilo-master/delete",
  authenticateJwt,
  deletePoCiloMappingController
);

// peo-po-master-related
systemRoutes.post(
  "/peo-po-master/create",
  authenticateJwt,
  createPeoPoMappingController
);
systemRoutes.post(
  "/peo-po-master/read",
  authenticateJwt,
  getPeoPoMappingController
);
systemRoutes.post(
  "/peo-po-master/update",
  authenticateJwt,
  updatePeoPoMappingController
);
systemRoutes.post(
  "/peo-po-master/delete",
  authenticateJwt,
  deletePeoPoMappingController
);

// peo-master-related
systemRoutes.post(
  "/peo-master/create",
  authenticateJwt,
  createProgramEducationalObjectiveController
);
systemRoutes.post(
  "/peo-master/read",
  authenticateJwt,
  getProgramEducationalObjectiveController
);
systemRoutes.post(
  "/peo-master/update",
  authenticateJwt,
  updateProgramEducationalObjectiveController
);
systemRoutes.post(
  "/peo-master/delete",
  authenticateJwt,
  deleteProgramEducationalObjectiveController
);

// curriculum-master-related
systemRoutes.post(
  "/curriculum-master/create",
  authenticateJwt,
  createCurriculumController
);
systemRoutes.post(
  "/curriculum-master/read",
  authenticateJwt,
  getCurriculumController
);
systemRoutes.post(
  "/curriculum-master/update",
  authenticateJwt,
  updateCurriculumController
);
systemRoutes.post(
  "/curriculum-master/delete",
  authenticateJwt,
  deleteCurriculumController
);

// curriculum-courses-file-master-related
systemRoutes.post(
  "/curriculum-courses-file-master/create",
  authenticateJwt,
  createCurriculumCoursesController
);
systemRoutes.post(
  "/curriculum-courses-file-master/read",
  authenticateJwt,
  getCurriculumCoursesController
);
systemRoutes.post(
  "/curriculum-courses-file-master/update",
  authenticateJwt,
  updateCurriculumCoursesController
);
systemRoutes.post(
  "/curriculum-courses-file-master/delete",
  authenticateJwt,
  deleteCurriculumCoursesController
);

// courses-cilos-related
systemRoutes.post(
  "/courses-cilos/create",
  authenticateJwt,
  createCoursesCilosController
);
systemRoutes.post(
  "/courses-cilos/read",
  authenticateJwt,
  getCoursesCilosController
);
systemRoutes.post(
  "/courses-cilos/update",
  authenticateJwt,
  updateCoursesCilosController
);
systemRoutes.post(
  "/courses-cilos/delete",
  authenticateJwt,
  deleteCoursesCilosController
);

export default systemRoutes;
