import shoppingAssistantPrompt from "../prompts/shoppingAssistant.prompt.js";

export const buildShoppingChatMessages = async ({ history, message }) =>
  shoppingAssistantPrompt.formatMessages({
    history,
    message,
  });
