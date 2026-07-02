import { ChatOpenAI } from "@langchain/openai";
import aiConfig from "../config/ai.config.js";

let chatGroqInstance;

export const createChatGroq = () => {
  if (!chatGroqInstance) {
    chatGroqInstance = new ChatOpenAI({
      model: aiConfig.modelName,
      temperature: aiConfig.temperature,
      maxTokens: aiConfig.maxTokens,
      apiKey: aiConfig.apiKey,
      configuration: {
        baseURL: aiConfig.baseUrl,
      },
    });
  }

  return chatGroqInstance;
};
