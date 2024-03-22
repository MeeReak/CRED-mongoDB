import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { UserRepo } from "../userRepo";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); // Start the server explicitly
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("UserRepo", () => {
  let userRepo: UserRepo;

  beforeEach(() => {
    userRepo = new UserRepo();
  });

  describe("Student Repository", () => {
    //show all the student testing
    test("Show all students", async () => {
      const student1 = {
        name: "Kaneki Ken",
        age: 20,
        university: "SabaiCode",
      };

      const student2 = {
        name: "Mee Reak",
        age: 22,
        university: "SabaiCode",
      };

      const newUser1 = await userRepo.createStudent(student1);
      const newUser2 = await userRepo.createStudent(student2);

      //find all the student
      const foundUser = await userRepo.showStudent();

      //assertion
      expect(foundUser.length).toBe(2);
      expect(foundUser.length).toBeGreaterThanOrEqual(1)
    });

    //create new student testing
    test("Create a new student", async () => {
      const student = {
        name: "John Doe",
        age: 20,
        university: "University of Lagos",
      };

      //add that student to database
      const newUser = await userRepo.createStudent(student);

      //assertion
      expect(newUser).toBeDefined();
      expect(newUser.name).toBe(student.name);
      expect(newUser.age).toBe(student.age);
      expect(newUser.university).toBe(student.university);

      //check if the student is saved in the database
      const foundUser = await userRepo.showStudentById(newUser.id);
      expect(foundUser).toBeDefined();
      expect(foundUser?.name).toEqual(student.name);
    });

    //delete a student testing
    test("Delete the student by id", async () => {
      const student = {
        name: "John Doe",
        age: 20,
        university: "University of Lagos",
      };

      const newUser = await userRepo.createStudent(student);

      //delete the student
      const deleteUser = await userRepo.deleteStudent(newUser.id);

      // Assert deletion: Try finding the deleted student by ID
      const foundUser = await userRepo.showStudentById(newUser.id);

      expect(foundUser).toBeNull();
    });

    test("Update student's info", async () => {
      // Create a student
      const student = {
        name: "John Doe",
        age: 20,
        university: "University of Lagos",
      };

      const createdStudent = await userRepo.createStudent(student);

      // Update student information
      const updateData = {
        name: "Mee Reak",
        age: 21,
        university: "Sabaicode",
      };
      const updatedStudent = await userRepo.updateStudent(
        createdStudent.id,
        updateData
      );

      // Assert updated information
      expect(updatedStudent).toBeDefined();
      expect(updatedStudent?.name).toBe(updateData.name);
      expect(updatedStudent?.age).toBe(updateData.age);
      expect(updatedStudent?.university).toBe(updateData.university);

      // Verify update in database
      const foundUser = await userRepo.showStudentById(createdStudent.id);
      expect(foundUser).toBeDefined();
      expect(foundUser?.name).toEqual(updateData.name);
    });

    // test("Attempt to Create student with invalid Data",async ()=>{
    //   const student = {
    //     name: "John Doe",
    //     age: 20,
    //   };

    //   const adduser = await userRepo.createStudent(student)

    //   await expect(adduser).rejects.toThrow()
    // })

    test("Show student by id", async () => {
      const student = {
        name: "John Doe",
        age: 20,
        university: "University of Lagos",
      };

      //add that student to database
      const newUser = await userRepo.createStudent(student);

      //find that student
      const findUser = await userRepo.showStudentById(newUser.id);

      // Assertions;
      expect(findUser).toBeDefined();
      expect(findUser?.id).toBe(newUser.id);
      expect(findUser?.name).toBe(student.name);
      expect(findUser?.age).toBe(student.age);
      expect(findUser?.university).toBe(student.university);
    });
  });
});