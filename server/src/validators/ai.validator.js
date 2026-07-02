import { z } from "zod";

export const aiChatSchema = z.object({
  message: z.string().trim().min(1, "Message is required"),
  conversationId: z.string().trim().min(1).optional(),
});

export const aiToolTestSchema = z.object({
  name: z.string().trim().min(1, "Tool name is required"),
  input: z.record(z.string(), z.unknown()).default({}),
});
