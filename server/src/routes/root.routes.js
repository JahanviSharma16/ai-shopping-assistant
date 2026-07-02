import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { getRoot } from "../controllers/systemController.js";

const router = Router();

router.get("/", asyncHandler(getRoot));

export default router;
