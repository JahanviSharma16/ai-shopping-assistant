import { ChatPromptTemplate } from "@langchain/core/prompts";

const reviewSummaryPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Summarize product reviews into strengths, weaknesses, and the type of buyer who would benefit most.",
  ],
  ["human", "{message}"],
]);

export default reviewSummaryPrompt;
