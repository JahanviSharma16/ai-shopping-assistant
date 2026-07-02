import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (payload) =>
  jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.accessTokenExpiry,
  });

export const generateRefreshToken = (payload) =>
  jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.refreshTokenExpiry,
  });

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.jwtAccessSecret);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, env.jwtRefreshSecret);
