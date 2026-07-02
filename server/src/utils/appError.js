import { HTTP_STATUS } from "../constants/httpStatus.js";

class AppError extends Error {
  constructor(
    message = "Internal server error",
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    error = {},
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.error = error;

    Error.captureStackTrace?.(this, this.constructor);
  }
}

export default AppError;
