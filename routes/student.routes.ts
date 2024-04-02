import express, { NextFunction, Request, Response } from "express";
import { StudentController } from "../controllers/Controller";
import { validateID } from "../middleware/validateID";
import { validateUser } from "../middleware/validateInput";
import { StudentService } from "../services/student.service";
import { StatusCode } from "../utils/statusCode";

export const router = express.Router();

const studentController = new StudentController(new StudentService());

//GET all student
router.get("/", async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    const student = await studentController.getAllStudents(
      pageNumber,
      pageSize
    );
    res.status(StatusCode.OK).json({ student });
  } catch (error) {
    _next(error);
  }
});

//GET a specific student
router.get(
  "/:id",
  validateID,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const student = await studentController.getStudentById(req.params.id);
      res.status(StatusCode.OK).json({ student });
    } catch (error) {
      _next(error);
    }
  }
);

//POST a new student
router.post(
  "/",
  validateUser,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const studentController = new StudentController(new StudentService());
      const student = await studentController.createStudent(req.body);
      res.status(StatusCode.Created).json({ student });
    } catch (error) {
      _next(error);
    }
  }
);

// DELETE a new student
router.delete(
  "/:id",
  validateID,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const student = studentController.deleteStudentById(req.params.id);
      res
        .status(StatusCode.NoContent)
        .json({ StatusCode: StatusCode.NoContent, message: "Student deleted" });
    } catch (error) {
      _next(error);
    }
  }
);

//UPDATE a student
router.patch(
  "/:id",
  validateID,
  validateUser,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const student = await studentController.updateStudentInfo(
        req.params.id,
        req.body
      );
      res.status(StatusCode.OK).json({ student });
    } catch (error) {
      _next(error);
    }
  }
);

export default router;
