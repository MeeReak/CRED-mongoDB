import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import studentModel from "../../databases/models/studentModel";
import { StatusCode } from "../../utils/statusCode";
import app from "../../app";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  await studentModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Books API", () => {
  test("GET / - Get all books", async () => {
    // Make the request
    const res = await request(app).get("/api/student");

    // Assert on response status and body
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ student: [] });
  });

  test("GET /:id - Get a specific book", async () => {
    // Create a new book
    const newStudent = await studentModel.create({
      name: "Mee Reak",
      age: 20,
      university: "SabaiCode",
    });

    // Make the request
    const res = await request(app).get(`/api/student/${newStudent._id}`);

    // Assert on response status and body
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      student: {
        name: "Mee Reak",
        age: 20,
        university: "SabaiCode",
        _id: newStudent._id.toString(),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  test("POST / - Create a new book", async () => {
    // Make the request
    const res = await request(app)
      .post("/api/student")
      .send({ name: "Mee Reak", age: 20, university: "SabaiCode" });

    // Assert on response status and body
    expect(res.status).toBe(StatusCode.Created);
    expect(res.body).toEqual({
      student: {
        name: "Mee Reak",
        age: 20,
        university: "SabaiCode",
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  test("Patch /:id - Update a specific book", async () => {
    // Create a new book
    const newStudent = await studentModel.create({
      name: "Mee Reak",
      age: 20,
      university: "Royal University of Phnom Penh",
    });

    // Make the request
    const res = await request(app)
      .patch(`/api/student/${newStudent._id}`)
      .send({ name: "Mee Reak", age: 23, university: "SabaiCode" });

    // Assert on response status and body
    expect(res.status).toBe(StatusCode.OK);
    expect(res.body).toEqual({
      student: {
        name: "Mee Reak",
        age: 23,
        university: "SabaiCode",
        _id: newStudent._id.toString(),
        createdAt: expect.any(String), // Expect createdAt to be a string
        updatedAt: expect.any(String), // Expect updatedAt to be a string
      },
    });
  });

  test("DELETE /:id - Delete a specific student", async () => {
    // Create a new student
    const newStudent = await studentModel.create({
      name: "Mee Reak",
      age: 20,
      university: "Royal University of Phnom Penh",
    });

    // Make the request to delete the student
    const res = await request(app).delete(`/api/student/${newStudent._id}`);

    // Assert on response status
    expect(res.status).toBe(StatusCode.NoContent);

    // Ensure that the student is deleted from the database
    const deletedStudent = await studentModel.findById(newStudent._id);
    expect(deletedStudent).toBeNull(); // Expect the deleted student to be null (not found)
  });
});
