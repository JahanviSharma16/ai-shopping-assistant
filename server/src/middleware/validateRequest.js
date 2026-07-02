import { ZodError } from "zod";
import AppError from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const formatZodErrors = (error) =>
  error.issues.reduce((accumulator, issue) => {
    const field = issue.path.join(".") || "body";
    accumulator[field] = issue.message;
    return accumulator;
  }, {});

const validateRequest = (schema) => async (req, res, next) => {
  try {
    req.validatedBody = await schema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(
        new AppError("Validation failed", HTTP_STATUS.UNPROCESSABLE_ENTITY, {
          fields: formatZodErrors(error),
        }),
      );
    }

    return next(error);
  }
};

export default validateRequest;
