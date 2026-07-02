import { Router } from "express";
import {
  chat,
  getTools,
  graphChat,
  streamChat,
  testTool,
} from "../controllers/ai.controller.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import validateRequest from "../../middleware/validateRequest.js";
import {
  aiChatSchema,
  aiGraphChatSchema,
  aiToolTestSchema,
} from "../../validators/ai.validator.js";

const router = Router();

router.post("/chat", validateRequest(aiChatSchema), asyncHandler(chat));
router.post(
  "/chat/stream",
  validateRequest(aiChatSchema),
  asyncHandler(streamChat),
);
router.get("/tools", asyncHandler(getTools));
router.post("/test-tool", validateRequest(aiToolTestSchema), asyncHandler(testTool));
router.post(
  "/graph/chat",
  validateRequest(aiGraphChatSchema),
  asyncHandler(graphChat),
);

export default router;
