import comparisonPrompt from "../../prompts/comparison.prompt.js";
import generalAssistantPrompt from "../../prompts/generalAssistant.prompt.js";
import productRecommendationPrompt from "../../prompts/productRecommendation.prompt.js";
import qaPrompt from "../../prompts/qa.prompt.js";
import shoppingAssistantPrompt from "../../prompts/shoppingAssistant.prompt.js";
import llmService from "../../services/llm.service.js";
import { getTextFromMessageContent } from "../../utils/messageContent.js";
import logger from "../../../utils/logger.js";
import { GRAPH_INTENTS } from "../state.js";

const getPromptTemplate = (intent) => {
  switch (intent) {
    case GRAPH_INTENTS.SEARCH_PRODUCT:
      return productRecommendationPrompt;
    case GRAPH_INTENTS.COMPARE_PRODUCTS:
      return comparisonPrompt;
    case GRAPH_INTENTS.PRODUCT_DETAILS:
      return qaPrompt;
    case GRAPH_INTENTS.GET_WISHLIST:
    case GRAPH_INTENTS.SEARCH_HISTORY:
      return shoppingAssistantPrompt;
    case GRAPH_INTENTS.GENERAL_CHAT:
    default:
      return generalAssistantPrompt;
  }
};

const formatPromptMessages = async (promptTemplate, state) => {
  const values = {
    message: buildReasoningMessage(state),
  };

  if (promptTemplate === shoppingAssistantPrompt || promptTemplate === generalAssistantPrompt) {
    values.history = state.chatHistory;
  }

  return promptTemplate.formatMessages(values);
};

const buildReasoningMessage = (state) => {
  if (!state.toolResult) {
    return state.userMessage;
  }

  return `User request: ${state.userMessage}

Intent: ${state.intent}
Tool used: ${state.toolName}
Tool result:
${JSON.stringify(state.toolResult.output, null, 2)}

Respond in a human-friendly way. Explain the result clearly, highlight relevant products when present, and make practical shopping recommendations when useful.`;
};

export const reasoningNode = async (state) => {
  try {
    const promptTemplate = getPromptTemplate(state.intent);
    const promptMessages = await formatPromptMessages(promptTemplate, state);
    const response = await llmService.chat(promptMessages);
    const reply = getTextFromMessageContent(response.content);

    return {
      llmResponse: reply,
    };
  } catch (error) {
    logger.error("Reasoning node failed", { error: error.message });

    return {
      llmResponse: "",
      errors: [
        {
          node: "reasoning",
          message: error.message,
        },
      ],
    };
  }
};
