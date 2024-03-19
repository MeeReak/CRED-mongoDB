export class ApiError extends Error {
  [x: string]: any;
  statusCode: number;
  constructor(message: string | undefined , statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; // Set the name of the error to the class name
    Error.captureStackTrace(this, this.constructor); // Capture stack trace
  }
}
