import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import productService from "../../services/product.service.js";
import logger from "../../utils/logger.js";

const productDetailsSchema = z.object({
  productId: z.string().trim().min(1, "productId is required"),
});

const productDetailsTool = new DynamicStructuredTool({
  name: "productDetails",
  description:
    "Fetch full details for a single product using its productId.",
  schema: productDetailsSchema,
  async func(input) {
    try {
      return await productService.getProductById(input.productId);
    } catch (error) {
      logger.error("productDetails tool execution failed", {
        error: error.message,
        productId: input.productId,
      });
      throw error;
    }
  },
});

export default productDetailsTool;
