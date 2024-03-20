import studentModel from "../models/studentModel";
import { Request } from "express";

export class UserRepo {
  //show all student
  async showStudent() {
    return await studentModel.find({}).sort({ createdAt: -1 });
  }

  //show student bt id
  async showStudentById(id: string) {
    return await studentModel.findById(id);
  }

  //create new student
  async createStudent(newData: object) {
    return await studentModel.create(newData);
  }

  //delete student by id
  async deleteStudent(id: string) {
    return await studentModel.findOneAndDelete({ _id: id });
  }

  //update student by id
  async updateStudent(id: string, newData: object) {
    try {
      console.log(newData);
      const updatedStudent = await studentModel.findOneAndUpdate(
        { _id: id },
        newData
      );
      return updatedStudent; // Or return a success message
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }
}
