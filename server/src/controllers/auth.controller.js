import authService from "../services/auth.service.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { successResponse } from "../utils/apiResponse.js";

export const register = async (req, res) => {
  const authData = await authService.register(req.validatedBody);

  return successResponse(
    res,
    "User registered successfully",
    authData,
    HTTP_STATUS.CREATED,
  );
};

export const login = async (req, res) => {
  const authData = await authService.login(req.validatedBody);

  return successResponse(res, "Login successful", authData);
};

export const getCurrentUser = async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  return successResponse(res, "Current user fetched successfully", user);
};

export const refreshAccessToken = async (req, res) => {
  const tokenData = await authService.refreshAccessToken(
    req.validatedBody.refreshToken,
  );

  return successResponse(res, "Access token refreshed successfully", tokenData);
};

export const logout = async (req, res) => {
  await authService.logout(req.validatedBody.refreshToken);

  return successResponse(res, "Logout successful");
};
