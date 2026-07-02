import logger from "../../../utils/logger.js";
import { GRAPH_INTENTS } from "../state.js";

const buildStructuredPayload = (state) => {
  const toolOutput = state.toolResult?.output;

  switch (state.intent) {
    case GRAPH_INTENTS.SEARCH_PRODUCT:
      return {
        answer: state.llmResponse,
        products: toolOutput?.items ?? [],
        comparison: {},
        metadata: {
          intent: state.intent,
          toolName: state.toolName,
          pagination: toolOutput?.pagination ?? null,
          conversationId: state.conversationId,
        },
      };
    case GRAPH_INTENTS.COMPARE_PRODUCTS:
      return {
        answer: state.llmResponse,
        products: [],
        comparison: toolOutput ?? {},
        metadata: {
          intent: state.intent,
          toolName: state.toolName,
          conversationId: state.conversationId,
        },
      };
    case GRAPH_INTENTS.PRODUCT_DETAILS:
      return {
        answer: state.llmResponse,
        products: toolOutput ? [toolOutput] : [],
        comparison: {},
        metadata: {
          intent: state.intent,
          toolName: state.toolName,
          conversationId: state.conversationId,
        },
      };
    case GRAPH_INTENTS.GET_WISHLIST:
      return {
        answer: state.llmResponse,
        products: toolOutput?.items ?? [],
        comparison: {},
        metadata: {
          intent: state.intent,
          toolName: state.toolName,
          conversationId: state.conversationId,
        },
      };
    case GRAPH_INTENTS.SEARCH_HISTORY:
      return {
        answer: state.llmResponse,
        products: [],
        comparison: {},
        metadata: {
          intent: state.intent,
          toolName: state.toolName,
          conversationId: state.conversationId,
          searches: toolOutput?.items ?? [],
        },
      };
    case GRAPH_INTENTS.GENERAL_CHAT:
    default:
      return {
        answer: state.llmResponse,
        products: [],
        comparison: {},
        metadata: {
          intent: state.intent,
          toolName: state.toolName,
          conversationId: state.conversationId,
          toolResult: toolOutput ?? null,
        },
      };
  }
};

export const formatterNode = async (state) => {
  try {
    return {
      finalResponse: buildStructuredPayload(state),
    };
  } catch (error) {
    logger.error("Formatter node failed", { error: error.message });

    return {
      finalResponse: {
        answer: state.llmResponse || "Unable to generate a formatted response.",
        products: [],
        comparison: {},
        metadata: {
          intent: state.intent,
          conversationId: state.conversationId,
        },
      },
      errors: [
        {
          node: "formatter",
          message: error.message,
        },
      ],
    };
  }
};
