import { Annotation } from "@langchain/langgraph";

const appendErrors = (left, right) => left.concat(right);

export const graphState = Annotation.Root({
  conversationId: Annotation({
    default: () => null,
    reducer: (_, right) => right,
  }),
  userId: Annotation({
    default: () => null,
    reducer: (_, right) => right,
  }),
  userMessage: Annotation({
    default: () => "",
    reducer: (_, right) => right,
  }),
  intent: Annotation({
    default: () => "GENERAL_CHAT",
    reducer: (_, right) => right,
  }),
  toolName: Annotation({
    default: () => null,
    reducer: (_, right) => right,
  }),
  toolInput: Annotation({
    default: () => ({}),
    reducer: (_, right) => right,
  }),
  toolResult: Annotation({
    default: () => null,
    reducer: (_, right) => right,
  }),
  llmResponse: Annotation({
    default: () => "",
    reducer: (_, right) => right,
  }),
  finalResponse: Annotation({
    default: () => null,
    reducer: (_, right) => right,
  }),
  chatHistory: Annotation({
    default: () => [],
    reducer: (_, right) => right,
  }),
  metadata: Annotation({
    default: () => ({}),
    reducer: (_, right) => ({ ...right }),
  }),
  errors: Annotation({
    default: () => [],
    reducer: appendErrors,
  }),
});

export const GRAPH_INTENTS = {
  SEARCH_PRODUCT: "SEARCH_PRODUCT",
  COMPARE_PRODUCTS: "COMPARE_PRODUCTS",
  PRODUCT_DETAILS: "PRODUCT_DETAILS",
  GET_WISHLIST: "GET_WISHLIST",
  SEARCH_HISTORY: "SEARCH_HISTORY",
  GENERAL_CHAT: "GENERAL_CHAT",
};
