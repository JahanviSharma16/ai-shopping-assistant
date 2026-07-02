import AppError from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const notFound = (req, res, next) => {
  next(
    new AppError(`Route not found: ${req.method} ${req.originalUrl}`, HTTP_STATUS.NOT_FOUND),
  );
};

export default notFound;
