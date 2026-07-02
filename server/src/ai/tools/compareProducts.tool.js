import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import productService from "../../services/product.service.js";
import logger from "../../utils/logger.js";

const compareProductsSchema = z.object({
  productIds: z
    .array(z.string().trim().min(1))
    .min(2, "At least two product ids are required")
    .max(5, "At most five product ids can be compared at once"),
});

const compareProductsTool = new DynamicStructuredTool({
  name: "compareProducts",
  description:
    "Compare multiple products and return a structured JSON comparison including title, price, rating, and specifications.",
  schema: compareProductsSchema,
  async func(input) {
    try {
      const products = await Promise.all(
        input.productIds.map((productId) => productService.getProductById(productId)),
      );

      return {
        items: products.map((product) => ({
          productId: product._id.toString(),
          title: product.title,
          price: product.price,
          discountPrice: product.discountPrice,
          currency: product.currency,
          rating: product.rating,
          reviewCount: product.reviewCount,
          specifications: product.specifications,
        })),
      };
    } catch (error) {
      logger.error("compareProducts tool execution failed", {
        error: error.message,
        productIds: input.productIds,
      });
      throw error;
    }
  },
});

export default compareProductsTool;
