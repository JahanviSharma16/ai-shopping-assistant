import { Router } from "express";
import { chat, getTools, streamChat, testTool } from "../controllers/ai.controller.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import validateRequest from "../../middleware/validateRequest.js";
import { aiChatSchema, aiToolTestSchema } from "../../validators/ai.validator.js";

const router = Router();

router.post("/chat", validateRequest(aiChatSchema), asyncHandler(chat));
router.post(
  "/chat/stream",
  validateRequest(aiChatSchema),
  asyncHandler(streamChat),
);
router.get("/tools", asyncHandler(getTools));
router.post("/test-tool", validateRequest(aiToolTestSchema), asyncHandler(testTool));

export default router;
