import { ZodError } from "zod";
import AppError from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const formatZodErrors = (error) =>
  error.issues.reduce((accumulator, issue) => {
    const field = issue.path.join(".") || "query";
    accumulator[field] = issue.message;
    return accumulator;
  }, {});

const validateQuery = (schema) => async (req, res, next) => {
  try {
    req.validatedQuery = await schema.parseAsync(req.query);
    return next();
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

export default validateQuery;
