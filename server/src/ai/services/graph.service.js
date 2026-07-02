import { randomUUID } from "node:crypto";
import aiGraph from "../graph/index.js";
import conversationMemory from "../memory/conversationMemory.js";

const createInitialState = async ({ message, userId, conversationId }) => {
  const resolvedConversationId = conversationId || randomUUID();
  const chatHistory = await conversationMemory.getMessages(resolvedConversationId);

  return {
    conversationId: resolvedConversationId,
    userId: userId || null,
    userMessage: message,
    intent: "GENERAL_CHAT",
    toolName: null,
    toolInput: {},
    toolResult: null,
    llmResponse: "",
    finalResponse: null,
    chatHistory,
    metadata: {},
    errors: [],
  };
};

const runGraph = async ({ message, userId, conversationId }) => {
  const initialState = await createInitialState({
    message,
    userId,
    conversationId,
  });
  const result = await aiGraph.invoke(initialState);

  await conversationMemory.addUserMessage(result.conversationId, message);
  await conversationMemory.addAIMessage(
    result.conversationId,
    result.finalResponse?.answer || result.llmResponse || "",
  );

  return {
    conversationId: result.conversationId,
    ...result.finalResponse,
    errors: result.errors,
  };
};

const streamGraph = async ({ message, userId, conversationId }) => {
  const initialState = await createInitialState({
    message,
    userId,
    conversationId,
  });

  return aiGraph.stream(initialState, {
    streamMode: "updates",
  });
};

export default {
  runGraph,
  streamGraph,
};
