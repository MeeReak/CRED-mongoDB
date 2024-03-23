import { ApiError } from "../../utils/classError";
import { validateUser } from "../validateInput";
import { Response, Request } from "express";

describe("validate Input", () => {
  test("Valid Input", () => {
    const req = {
      body: { name: "Mee Reak", age: 20, university: "SabaiCode" },
    };
    const res = {};
    const next = jest.fn();

    validateUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  test("Invalid Input (Missing Property)", async () => {
    const req = { body: { age: 20 } }; // Missing name property
    const res = {};
    const next = jest.fn();

    try {
      validateUser(req as Request, res as Response, next);
    } catch (error: any | unknown) {
      expect(error).toBeInstanceOf(ApiError); // Expect an ApiError to be thrown
      expect(error.message).toContain("required_error"); // Check for specific error message
    }
  });

  test("Invalid Input (Type Mismatch)", async () => {
    const req = { body: { name: 123, age: "12" } }; // Name is a number
    const res = {};
    const next = jest.fn();

    try {
      validateUser(req as Request, res as Response, next);
    } catch (error: any | unknown) {
      expect(error).toBeInstanceOf(ApiError); // Expect an ApiError to be thrown
      expect(error.message).toContain("type mismatch"); // Check for generic type mismatch message
    }
  });

  test("Unexpected Error", async () => {
    const req = {} as any; // Invalid request object (to trigger unexpected error)
    const res = {};
    const next = jest.fn();
  
    try {
      validateUser(req, res as Response, next);
    } catch (error : any | unknown) {
      expect(error).toBeInstanceOf(ApiError); // Expect an ApiError to be thrown
      expect(error.message).toContain('Internal Server Error'); // Check for generic error message
    }
  });
});
