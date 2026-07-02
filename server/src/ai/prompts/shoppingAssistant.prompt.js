import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MessagesPlaceholder } from "@langchain/core/prompts";

const shoppingAssistantPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are an expert shopping assistant. Help users compare products, explain trade-offs, and recommend options based on budget, category, use case, and preferences. If details are missing, make reasonable assumptions and clearly state them.",
  ],
  new MessagesPlaceholder("history"),
  ["human", "{message}"],
]);

export default shoppingAssistantPrompt;
