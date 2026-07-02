import toolService from "../../services/tool.service.js";
import logger from "../../../utils/logger.js";

export const toolExecutorNode = async (state) => {
  if (!state.toolName) {
    return {
      toolResult: null,
    };
  }

  const toolInput = {
    ...state.toolInput,
  };

  if (state.toolName === "wishlist" || state.toolName === "searchHistory") {
    toolInput.userId = toolInput.userId ?? state.userId;
  }

  try {
    const result = await toolService.executeTool({
      name: state.toolName,
      input: toolInput,
    });

    return {
      toolInput,
      toolResult: result,
      metadata: {
        ...state.metadata,
        executedTool: state.toolName,
      },
    };
  } catch (error) {
    logger.error("Tool executor node failed", {
      error: error.message,
      toolName: state.toolName,
    });

    return {
      toolResult: null,
      errors: [
        {
          node: "toolExecutor",
          message: error.message,
          toolName: state.toolName,
        },
      ],
    };
  }
};
