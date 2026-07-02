import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import searchHistoryService from "../../services/searchHistory.service.js";
import logger from "../../utils/logger.js";

const searchHistorySchema = z.object({
  userId: z.string().trim().min(1, "userId is required"),
});

const searchHistoryTool = new DynamicStructuredTool({
  name: "searchHistory",
  description:
    "Fetch the latest saved search history for a given userId.",
  schema: searchHistorySchema,
  async func(input) {
    try {
      const searches = await searchHistoryService.getSearchHistory(input.userId);

      return {
        userId: input.userId,
        items: searches,
      };
    } catch (error) {
      logger.error("searchHistory tool execution failed", {
        error: error.message,
        userId: input.userId,
      });
      throw error;
    }
  },
});

export default searchHistoryTool;
