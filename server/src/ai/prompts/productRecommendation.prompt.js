import { ChatPromptTemplate } from "@langchain/core/prompts";

const productRecommendationPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Recommend products based on the user's budget, preferred category, brand preferences, and required features. Explain why each option fits.",
  ],
  ["human", "{message}"],
]);

export default productRecommendationPrompt;
