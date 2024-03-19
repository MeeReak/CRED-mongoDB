import mongoose from "mongoose";
import StudentModel from "../models/studentModel";
import { StatusCode } from "../utils/statusCode";

//get all student
export const showAllStudent = async (req: any, res: any) => {
  const student = await StudentModel.find({}).sort({ createdAt: -1 });

  res.status(StatusCode.OK).json({ student });
};

//get a single student
export const showStudentById = async (req: any, res: any, next: Function) => {
  const { id } = req.params;

  try {
    // Validate ID format using Mongoose's ObjectId.isValid()
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   throw new Error("Invalid ID format.");
    // }

    // Attempt to find student using findById()
    const student = await StudentModel.findById(id);

    if (!student) {
      throw new Error("Student not found");
    }
    res.status(200).json({ student });
  } catch (error: any) {
    next(error); // Pass the error to the next error handler
  }
};

//create a new student
export const addNewStudent = async (req: any, res: any) => {
  const { name, age, university } = req.body;

  //add doc to db
  try {
    const student = await StudentModel.create({ name, age, university });
    res.status(StatusCode.OK).json({ student });
  } catch (error: any) {
    res.status(StatusCode.BadRequest).json({ error: error.message });
  }
};

//delete a student
export const deleteStudentById = async (req: any, res: any) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(StatusCode.NotFound)
      .json({ error: "Student not found!!" });
  }

  const student = await StudentModel.findOneAndDelete({ _id: id });

  student
    ? res.status(StatusCode.OK).json(student)
    : res.status(StatusCode.NotFound).json({ error: "Student not found" });
};

//update a student
export const updateStudentInfo = async (req: any, res: any) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(StatusCode.NotFound)
      .json({ error: "Student not found!!" });
  }

  const student = await StudentModel.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  student
    ? res.status(StatusCode.OK).json(student)
    : res.status(StatusCode.NotFound).json({ error: "Student not found" });
};
