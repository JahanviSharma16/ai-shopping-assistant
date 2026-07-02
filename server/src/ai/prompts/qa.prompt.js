import { ChatPromptTemplate } from "@langchain/core/prompts";

const qaPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Answer user questions clearly and directly. If the request lacks enough detail, note the limitation briefly before answering.",
  ],
  ["human", "{message}"],
]);

export default qaPrompt;
