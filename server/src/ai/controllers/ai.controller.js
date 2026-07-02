import aiService from "../services/ai.service.js";
import { successResponse } from "../../utils/apiResponse.js";

export const chat = async (req, res) => {
  const result = await aiService.chat(req.validatedBody);

  return successResponse(res, "AI reply generated successfully", result);
};

export const streamChat = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const { conversationId, reply } = await aiService.streamChat({
    ...req.validatedBody,
    onToken(token, resolvedConversationId) {
      res.write(
        `data: ${JSON.stringify({
          conversationId: resolvedConversationId,
          token,
        })}\n\n`,
      );
    },
  });

  res.write(
    `data: ${JSON.stringify({
      conversationId,
      done: true,
      reply,
    })}\n\n`,
  );
  res.end();
};
