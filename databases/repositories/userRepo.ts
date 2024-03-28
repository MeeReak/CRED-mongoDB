import studentModel from "../models/studentModel";

export class UserRepo {
  //show all student
  async showStudent(pageNumber: number, pageSize: number): Promise<any> {
    const totalCount = await studentModel.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const student = await studentModel
      .find({})
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return { student, totalPages, totalCount };
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
      const updatedStudent = await studentModel.findOneAndUpdate(
        { _id: id },
        newData,
        { new: true }
      );
      return updatedStudent; // Or return a success message
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }
}
