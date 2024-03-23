import { StatusCode } from "../utils/statusCode";
import { ApiError } from "../utils/classError";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";

//get all student
export const showAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const student = await StudentModel.find({}).sort({ createdAt: -1 });
  const service = new UserService();

  const student = await service.showStudent();

  res.status(StatusCode.OK).json({ student });

  // res.status(StatusCode.OK).json({ student });
};

//get a single student
export const showStudentById = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { id } = req.params;

  // Attempt to find student using findById()
  const service = new UserService();

  const student = await service.showStudentByID(id);

  if (!student) {
    next(new ApiError("Student Not Found!", StatusCode.NotFound));
  } else {
    res.status(200).json({ student });
  }
};

//create a new student
export const addNewStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, age, university } = req.body;

  //add doc to db
  const service = new UserService();

  const student = await service.createStudent({ name, age, university });

  res.status(StatusCode.OK).json({ student });
};

//delete a student
export const deleteStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const service = new UserService();

  const student = await service.deleteStudent(id);

  if (!student) {
    next(new ApiError("Student Not Found!", StatusCode.NotFound));
  }
  res.status(StatusCode.OK).json(student);
};

//update a student
export const updateStudentInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const service = new UserService();

  const { name, age, university } = req.body;
  const student = await service.updateStudent(id, { name, age, university });

  if (!student) {
    next(new ApiError("Student Not Found!", StatusCode.NotFound));
  }
  res.status(StatusCode.OK).json(student);
};
