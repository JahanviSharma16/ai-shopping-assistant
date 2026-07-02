import { HTTP_STATUS } from "../constants/httpStatus.js";
import { errorResponse } from "../utils/apiResponse.js";
import logger from "../utils/logger.js";

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = error.message || "Internal server error";
  const details = error.error || {};

  logger.error(message, {
    statusCode,
    method: req.method,
    path: req.originalUrl,
    stack: error.stack,
  });

  if (res.headersSent) {
    return next(error);
  }

  return errorResponse(res, statusCode, message, details);
};

export default errorHandler;
