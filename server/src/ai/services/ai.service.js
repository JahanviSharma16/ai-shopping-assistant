import { randomUUID } from "node:crypto";
import conversationMemory from "../memory/conversationMemory.js";
import { buildShoppingChatMessages } from "../chains/chat.chain.js";
import llmService from "./llm.service.js";
import { getTextFromMessageContent } from "../utils/messageContent.js";

const createConversationId = () => randomUUID();

const chat = async ({ message, conversationId }) => {
  const resolvedConversationId = conversationId || createConversationId();
  const history = await conversationMemory.getMessages(resolvedConversationId);
  const promptMessages = await buildShoppingChatMessages({
    history,
    message,
  });
  const response = await llmService.chat(promptMessages);
  const reply = getTextFromMessageContent(response.content);

  await conversationMemory.addUserMessage(resolvedConversationId, message);
  await conversationMemory.addAIMessage(resolvedConversationId, reply);

  return {
    conversationId: resolvedConversationId,
    reply,
  };
};

const streamChat = async ({ message, conversationId, onToken }) => {
  const resolvedConversationId = conversationId || createConversationId();
  const history = await conversationMemory.getMessages(resolvedConversationId);
  const promptMessages = await buildShoppingChatMessages({
    history,
    message,
  });
  const stream = await llmService.stream(promptMessages);
  let reply = "";

  for await (const chunk of stream) {
    const token = getTextFromMessageContent(chunk.content);

    if (!token) {
      continue;
    }

    reply += token;
    onToken(token, resolvedConversationId);
  }

  await conversationMemory.addUserMessage(resolvedConversationId, message);
  await conversationMemory.addAIMessage(resolvedConversationId, reply);

  return {
    conversationId: resolvedConversationId,
    reply,
  };
};

export default {
  chat,
  streamChat,
};
