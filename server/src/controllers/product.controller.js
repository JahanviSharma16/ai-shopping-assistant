import { HTTP_STATUS } from "../constants/httpStatus.js";
import productService from "../services/product.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getProducts = async (req, res) => {
  const result = await productService.listProducts(
    req.validatedQuery,
    req.user?.id,
  );

  return successResponse(res, "Products fetched successfully", result);
};

export const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return successResponse(res, "Product fetched successfully", product);
};

export const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.validatedBody);

  return successResponse(
    res,
    "Product created successfully",
    product,
    HTTP_STATUS.CREATED,
  );
};

export const updateProduct = async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.validatedBody);

  return successResponse(res, "Product updated successfully", product);
};

export const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);

  return successResponse(res, "Product deleted successfully");
};
