import AppError from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import userRepository from "../repositories/user.repository.js";
import { comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const sanitizeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
  isVerified: user.isVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const buildTokenPayload = (user) => ({
  sub: user._id.toString(),
  email: user.email,
  role: user.role,
});

const buildAuthResponse = (user) => {
  const tokenPayload = buildTokenPayload(user);

  return {
    accessToken: generateAccessToken(tokenPayload),
    refreshToken: generateRefreshToken(tokenPayload),
    user: sanitizeUser(user),
  };
};

const register = async (payload) => {
  const existingUser = await userRepository.findUserByEmail(payload.email);

  if (existingUser) {
    throw new AppError("User already exists", HTTP_STATUS.CONFLICT);
  }

  const user = await userRepository.createUser(payload);
  const authData = buildAuthResponse(user);

  await userRepository.updateRefreshToken(user._id, authData.refreshToken);

  return authData;
};

const login = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email, {
    includePassword: true,
  });

  if (!user) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  const authData = buildAuthResponse(user);

  await userRepository.updateRefreshToken(user._id, authData.refreshToken);

  return authData;
};

const getCurrentUser = async (userId) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
  }

  return sanitizeUser(user);
};

const refreshAccessToken = async (refreshToken) => {
  let decodedToken;

  try {
    decodedToken = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  const user = await userRepository.findUserById(decodedToken.sub, {
    includeRefreshToken: true,
  });

  if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
    throw new AppError("Invalid or expired refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  return {
    accessToken: generateAccessToken(buildTokenPayload(user)),
  };
};

const logout = async (refreshToken) => {
  let decodedToken;

  try {
    decodedToken = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  const user = await userRepository.findUserById(decodedToken.sub, {
    includeRefreshToken: true,
  });

  if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
    throw new AppError("Invalid or expired refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  await userRepository.clearRefreshToken(user._id);
};

export default {
  register,
  login,
  getCurrentUser,
  refreshAccessToken,
  logout,
};
