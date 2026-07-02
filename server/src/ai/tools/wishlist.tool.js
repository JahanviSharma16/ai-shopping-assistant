import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import wishlistService from "../../services/wishlist.service.js";
import logger from "../../utils/logger.js";

const wishlistSchema = z.object({
  userId: z.string().trim().min(1, "userId is required"),
});

const wishlistTool = new DynamicStructuredTool({
  name: "wishlist",
  description:
    "Fetch the wishlist products for a given userId.",
  schema: wishlistSchema,
  async func(input) {
    try {
      const products = await wishlistService.getWishlist(input.userId);

      return {
        userId: input.userId,
        items: products,
      };
    } catch (error) {
      logger.error("wishlist tool execution failed", {
        error: error.message,
        userId: input.userId,
      });
      throw error;
    }
  },
});

export default wishlistTool;
