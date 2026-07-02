import { END } from "@langchain/langgraph";
import { GRAPH_INTENTS } from "./state.js";

export const routeFromRouter = (state) => {
  switch (state.intent) {
    case GRAPH_INTENTS.SEARCH_PRODUCT:
    case GRAPH_INTENTS.COMPARE_PRODUCTS:
    case GRAPH_INTENTS.PRODUCT_DETAILS:
    case GRAPH_INTENTS.GET_WISHLIST:
    case GRAPH_INTENTS.SEARCH_HISTORY:
      return "toolExecutor";
    case GRAPH_INTENTS.GENERAL_CHAT:
    default:
      return "reasoning";
  }
};

export const formatterToEnd = () => END;
