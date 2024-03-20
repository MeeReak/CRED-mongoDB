import express from "express";

const router = express.Router();
import {
  addNewStudent,
  showAllStudent,
  showStudentById,
  deleteStudentById,
  updateStudentInfo,
} from "../controllers/studentController";
import { validateID } from "../middleware/validateID";
import { validateUser } from "../middleware/zod.validate";

//GET all students
router.get("/", showAllStudent);

//GET a specific student
router.get("/:id", validateID, showStudentById);

//POST a new student
router.post("/", validateUser, addNewStudent);

//DELETE a new student
router.delete("/:id", validateID, deleteStudentById);

//UPDATE a student
router.patch("/:id", validateID, validateUser, updateStudentInfo);

module.exports = router;
