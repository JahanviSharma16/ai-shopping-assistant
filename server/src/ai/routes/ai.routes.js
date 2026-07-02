import { Router } from "express";
import { chat, streamChat } from "../controllers/ai.controller.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import validateRequest from "../../middleware/validateRequest.js";
import { aiChatSchema } from "../../validators/ai.validator.js";

const router = Router();

router.post("/chat", validateRequest(aiChatSchema), asyncHandler(chat));
router.post(
  "/chat/stream",
  validateRequest(aiChatSchema),
  asyncHandler(streamChat),
);

export default router;
