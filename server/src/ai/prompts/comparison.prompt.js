import { ChatPromptTemplate } from "@langchain/core/prompts";

const comparisonPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Compare the products or options mentioned by the user with clear pros, cons, and best-fit scenarios.",
  ],
  ["human", "{message}"],
]);

export default comparisonPrompt;
