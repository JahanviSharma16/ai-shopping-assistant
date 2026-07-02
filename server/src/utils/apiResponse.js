import { HTTP_STATUS } from "../constants/httpStatus.js";

export const successResponse = (
  res,
  message,
  data = null,
  statusCode = HTTP_STATUS.OK,
) => {
  const payload = {
    success: true,
    message,
  };

  if (data !== null) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
};

export const errorResponse = (
  res,
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  message = "Internal server error",
  error = {},
) =>
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
