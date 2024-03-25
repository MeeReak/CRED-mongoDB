import express from "express";
import {
  addNewStudent,
  showAllStudent,
  showStudentById,
  deleteStudentById,
  updateStudentInfo,
} from "../controllers/studentController";
import { validateID } from "../middleware/validateID";
import { validateUser } from "../middleware/validateInput";

export const router = express.Router();

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

export default router;
