import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { getHealth } from "../controllers/systemController.js";

const router = Router();

router.get("/health", asyncHandler(getHealth));

export default router;
