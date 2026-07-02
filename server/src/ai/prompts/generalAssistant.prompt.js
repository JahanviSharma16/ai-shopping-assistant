import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MessagesPlaceholder } from "@langchain/core/prompts";

const generalAssistantPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful AI assistant for an ecommerce backend. Give concise, accurate, user-friendly answers.",
  ],
  new MessagesPlaceholder("history"),
  ["human", "{message}"],
]);

export default generalAssistantPrompt;
