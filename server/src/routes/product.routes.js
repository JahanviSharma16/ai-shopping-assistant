import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import authenticate from "../middleware/auth.middleware.js";
import authorizeAdmin from "../middleware/admin.middleware.js";
import optionalAuthenticate from "../middleware/optionalAuth.middleware.js";
import validateQuery from "../middleware/validateQuery.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  createProductSchema,
  productSearchQuerySchema,
  updateProductSchema,
} from "../validators/product.validator.js";

const router = Router();

router.get(
  "/",
  asyncHandler(optionalAuthenticate),
  validateQuery(productSearchQuerySchema),
  asyncHandler(getProducts),
);

router.get("/:id", asyncHandler(getProductById));

router.post(
  "/",
  asyncHandler(authenticate),
  asyncHandler(authorizeAdmin),
  validateRequest(createProductSchema),
  asyncHandler(createProduct),
);

router.put(
  "/:id",
  asyncHandler(authenticate),
  asyncHandler(authorizeAdmin),
  validateRequest(updateProductSchema),
  asyncHandler(updateProduct),
);

router.delete(
  "/:id",
  asyncHandler(authenticate),
  asyncHandler(authorizeAdmin),
  asyncHandler(deleteProduct),
);

export default router;
