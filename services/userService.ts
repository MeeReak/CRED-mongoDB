import { UserRepo } from "../databases/repositories/userRepo";
import { Request } from "express";

export class UserService {
  static showStudent() {
    throw new Error("Method not implemented.");
  }
  repo: any;
  constructor() {
    this.repo = new UserRepo();
  }

  //show all student
  async showStudent() {
    return await this.repo.showStudent();
  }

  //show student by id
  async showStudentByID(id: string) {
    return await this.repo.showStudentById(id);
  }

  //create a new student
  async createStudent(newData: object) {
    return await this.repo.createStudent(newData);
  }

  //delete student by id
  async deleteStudent(id: string) {
    return await this.repo.deleteStudent(id);
  }

  //update student by id
  async updateStudent(id: string, data: object) {
    return await this.repo.updateStudent(id, data);
  }
}
