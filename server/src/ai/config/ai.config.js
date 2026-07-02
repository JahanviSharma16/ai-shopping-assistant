import env from "../../config/env.js";

const aiConfig = {
  apiKey: env.groqApiKey,
  modelName: env.modelName,
  temperature: env.temperature,
  maxTokens: env.maxTokens,
  baseUrl: "https://api.groq.com/openai/v1",
};

export default aiConfig;
