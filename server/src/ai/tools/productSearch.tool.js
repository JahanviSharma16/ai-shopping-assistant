import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import productService from "../../services/product.service.js";
import logger from "../../utils/logger.js";

const productSearchSchema = z.object({
  query: z.string().trim().optional(),
  category: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
});

const productSearchTool = new DynamicStructuredTool({
  name: "productSearch",
  description:
    "Search products by query, category, brand, and price range. Returns matching products and pagination metadata.",
  schema: productSearchSchema,
  async func(input) {
    try {
      return await productService.listProducts(
        {
          page: 1,
          limit: 12,
          search: input.query,
          category: input.category,
          brand: input.brand,
          minPrice: input.minPrice,
          maxPrice: input.maxPrice,
          sort: "latest",
        },
        undefined,
      );
    } catch (error) {
      logger.error("productSearch tool execution failed", {
        error: error.message,
      });
      throw error;
    }
  },
});

export default productSearchTool;
