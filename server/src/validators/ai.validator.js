import { z } from "zod";

export const aiChatSchema = z.object({
  message: z.string().trim().min(1, "Message is required"),
  conversationId: z.string().trim().min(1).optional(),
});
