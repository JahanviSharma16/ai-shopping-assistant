import AppError from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(
      new AppError("Admin access is required", HTTP_STATUS.FORBIDDEN),
    );
  }

  return next();
};

export default authorizeAdmin;
