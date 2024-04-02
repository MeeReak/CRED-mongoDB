//old code
// import { StatusCode } from "../utils/statusCode";
// import { ApiError } from "../utils/classError";
// import { Request, Response, NextFunction } from "express";
// import { UserService } from "../services/userService";

// //get all student
// export const showAllStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const service = new UserService();

//   const student = await service.showStudent();

//   res.status(StatusCode.OK).json({ student });
// };

// //get a single student
// export const showStudentById = async (
//   req: Request,
//   res: Response,
//   next: Function
// ) => {
//   const { id } = req.params;

//   // Attempt to find student using findById()
//   const service = new UserService();

//   const student = await service.showStudentByID(id);

//   if (!student) {
//     next(new ApiError("Student Not Found!", StatusCode.NotFound));
//   } else {
//     res.status(StatusCode.OK).json({ student });
//   }
// };

// //create a new student
// export const addNewStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { name, age, university } = req.body;

//   //add doc to db
//   const service = new UserService();

//   const student = await service.createStudent({ name, age, university });

//   res.status(StatusCode.Created).json({ student });
// };

// //delete a student
// export const deleteStudentById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.params;

//   const service = new UserService();

//   const student = await service.deleteStudent(id);

//   if (!student) {
//     next(new ApiError("Student Not Found!", StatusCode.NotFound));
//   }
//   res.status(StatusCode.NoContent).json({ student });
// };

// //update a student
// export const updateStudentInfo = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.params;

//   const service = new UserService();

//   const { name, age, university } = req.body;
//   const student = await service.updateStudent(id, { name, age, university });

//   if (!student) {
//     next(new ApiError("Student Not Found!", StatusCode.NoContent));
//   }

//   res.status(StatusCode.OK).json({ student });
// };

import { StudentService } from "../services/student.service";
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
  Tags,
} from "tsoa";
import { ApiError } from "../utils/classError";
import { validateUser } from "../middleware/validateInput"; // Assuming you have validation middleware
import { UserService } from "../services/user.service";
import { generatePassword } from "../utils/jwt";
import { generateVerificationToken } from "../utils/generateToken";
import { sendVerificationEmail } from "../utils/sendVerifyEmail";

interface Student {
  name: string;
  age: number;
  university: string;
}

interface User {
  name: string;
  email: string;
  password: string;
}

@Route("/api/student")
@Tags("Student")
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
      const student = await this.studentService.showStudent(
        pageNumber,
        pageSize
      );
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

@Route("/api/user")
@Tags("User")
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post("/signup")
  public async createUser(@Body() requestBody: User) {
    const { name, email, password } = requestBody;

    const hashPassword = await generatePassword(password);
    try {
      const user = await this.userService.SignUp({
        name,
        email,
        password: hashPassword,
      });

      await this.userService.SendVerifyEmail(email, user.id);

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get("/verify")
  public async verifyUser(@Query() token: string) {
    try {
      // Verify the email token
      await this.userService.VerifyUser(token);
    } catch (error) {
      throw error
    }
  }
}
