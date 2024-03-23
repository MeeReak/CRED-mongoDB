import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/classError";
import { StatusCode } from "../../utils/statusCode";
import { handError } from "../errorHandler";

describe("errorHandler middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should handle ApiError correctly", () => {
    const mockError = new ApiError("Test Error", StatusCode.BadRequest);

    mockError.serializeErrorOutput = jest.fn().mockReturnValue({
      message: mockError.message,
      statusCode: mockError.statusCode,
    });
    handError(mockError, req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(mockError.statusCode);
    expect(res.json).toHaveBeenCalledWith(mockError.serializeErrorOutput());
  });

  it("should create a valid ApiError instance", () => {
    const mockError = new ApiError("Test Error", StatusCode.BadRequest);

    expect(mockError instanceof ApiError).toBe(true);
    expect(mockError.message).toBe("Test Error");
    expect(mockError.statusCode).toBe(StatusCode.BadRequest);
    expect(mockError.name).toBe("ApiError");
  });

  it("should capture stack trace", () => {
    const error = new ApiError("Test Error", StatusCode.InternalServerError);

    expect(error.stack).toBeDefined();
  });
});
