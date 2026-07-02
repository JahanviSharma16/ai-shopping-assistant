import { z } from "zod";
import llmService from "../../services/llm.service.js";
import logger from "../../../utils/logger.js";
import { GRAPH_INTENTS } from "../state.js";

const routerOutputSchema = z.object({
  intent: z.enum([
    GRAPH_INTENTS.SEARCH_PRODUCT,
    GRAPH_INTENTS.COMPARE_PRODUCTS,
    GRAPH_INTENTS.PRODUCT_DETAILS,
    GRAPH_INTENTS.GET_WISHLIST,
    GRAPH_INTENTS.SEARCH_HISTORY,
    GRAPH_INTENTS.GENERAL_CHAT,
  ]),
  toolName: z
    .enum([
      "productSearch",
      "compareProducts",
      "productDetails",
      "wishlist",
      "searchHistory",
    ])
    .nullable()
    .optional(),
  toolInput: z.record(z.string(), z.unknown()).default({}),
  metadata: z
    .object({
      confidence: z.number().min(0).max(1).optional(),
      reasoning: z.string().optional(),
    })
    .optional()
    .default({}),
});

const buildRouterPrompt = (state) => `
You are the routing node of an AI shopping workflow.
Analyze the user message and decide the best intent and optional tool.

Available intents:
- SEARCH_PRODUCT
- COMPARE_PRODUCTS
- PRODUCT_DETAILS
- GET_WISHLIST
- SEARCH_HISTORY
- GENERAL_CHAT

Available tools:
- productSearch: product search by query/category/brand/minPrice/maxPrice
- compareProducts: compare products by productIds
- productDetails: fetch one product by productId
- wishlist: fetch wishlist by userId
- searchHistory: fetch latest searches by userId

Rules:
- Do not invent product ids.
- If the user asks to compare products, use COMPARE_PRODUCTS only when product ids are clearly provided.
- If the user asks for a specific product by id, use PRODUCT_DETAILS.
- If the user asks about wishlist and a userId is available, use GET_WISHLIST and pass userId.
- If the user asks about past searches and a userId is available, use SEARCH_HISTORY and pass userId.
- Use SEARCH_PRODUCT for shopping discovery, recommendations, budgets, categories, brands, and price ranges.
- Use GENERAL_CHAT when no tool is needed.
- Return toolName as null for GENERAL_CHAT.
- Return only structured output.

User message:
${state.userMessage}

Known userId:
${state.userId ?? "unknown"}
`;

export const routerNode = async (state) => {
  try {
    const structuredRouter = llmService.structuredOutput(routerOutputSchema);
    const result = await structuredRouter.invoke(buildRouterPrompt(state));
    const requiresUserId =
      result.intent === GRAPH_INTENTS.GET_WISHLIST ||
      result.intent === GRAPH_INTENTS.SEARCH_HISTORY;

    if (requiresUserId && !state.userId) {
      return {
        intent: GRAPH_INTENTS.GENERAL_CHAT,
        toolName: null,
        toolInput: {},
        metadata: {
          ...state.metadata,
          router: {
            ...(result.metadata ?? {}),
            fallbackReason: "userId_missing",
          },
        },
      };
    }

    return {
      intent: result.intent,
      toolName: result.toolName ?? null,
      toolInput: result.toolInput ?? {},
      metadata: {
        ...state.metadata,
        router: result.metadata ?? {},
      },
    };
  } catch (error) {
    logger.error("Router node failed", { error: error.message });

    return {
      intent: GRAPH_INTENTS.GENERAL_CHAT,
      toolName: null,
      toolInput: {},
      errors: [
        {
          node: "router",
          message: error.message,
        },
      ],
    };
  }
};
