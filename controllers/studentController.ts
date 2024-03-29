import { StudentService } from "../services/studentService";
import { StatusCode } from "../utils/statusCode";
import {
  Route,
  Get,
  Post,
  Delete,
  Put,
  Path,
  Body,
  Middlewares,
  Response,
  Patch,
  Query,
} from "tsoa";
import { ApiError } from "../utils/classError";
import { validateUser } from "../middleware/validateInput"; // Assuming you have validation middleware

interface Student {
  name: string;
  age: number;
  university: string;
}

@Route("/api/student")
export class StudentController {
  private readonly studentService: StudentService;

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  @Get("/")
  public async getAllStudents(
    @Query() pageNumber: number = 1,
    @Query() pageSize: number = 5
  ): Promise<Student[]> {
    try {
      const student = await this.studentService.showStudent(pageNumber, pageSize);
      return student;
    } catch (error) {
      throw error;
    }
  }

  @Get("/{id}")
  public async getStudentById(@Path() id: string): Promise<void> {
    try {
      const student = await this.studentService.showStudentByID(id);
      if (!student) {
        throw new ApiError("Student Not Found!", StatusCode.NotFound);
      }
      return student;
    } catch (error) {
      throw error;
    }
  }

  @Post("/")
  public async createStudent(@Body() requestBody: Student): Promise<void> {
    const { name, age, university } = requestBody;

    try {
      const student = await this.studentService.createStudent({
        name,
        age,
        university,
      });
      return student;
    } catch (error) {
      throw error;
    }
  }

  @Delete("/{id}")
  @Response<Error>(StatusCode.NotFound, "User not found")
  public async deleteStudentById(@Path() id: string): Promise<void> {
    try {
      const student = await this.studentService.deleteStudent(id);
      return student;
    } catch (error) {
      throw error;
    }
  }

  @Patch("/:id")
  public async updateStudentInfo(
    @Path() id: string,
    @Body() requestBody: Student
  ): Promise<void> {
    const { name, age, university } = requestBody;

    try {
      const student = await this.studentService.updateStudent(id, {
        name,
        age,
        university,
      });
      if (!student) {
        throw new ApiError("Student Not Found!", StatusCode.NotFound);
      }
      return student;
    } catch (error) {
      throw error;
    }
  }
}
