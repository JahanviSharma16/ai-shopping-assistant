import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import authenticate from "../middleware/auth.middleware.js";
import { getSearchHistory } from "../controllers/searchHistory.controller.js";

const router = Router();

router.use(asyncHandler(authenticate));

router.get("/", asyncHandler(getSearchHistory));

export default router;
