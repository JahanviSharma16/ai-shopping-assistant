import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import authenticate from "../middleware/auth.middleware.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controllers/auth.controller.js";
import {
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  registerSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(register),
);

router.post("/login", validateRequest(loginSchema), asyncHandler(login));

router.get("/me", asyncHandler(authenticate), asyncHandler(getCurrentUser));

router.post(
  "/refresh",
  validateRequest(refreshTokenSchema),
  asyncHandler(refreshAccessToken),
);

router.post("/logout", validateRequest(logoutSchema), asyncHandler(logout));

export default router;
