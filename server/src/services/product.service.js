import mongoose from "mongoose";
import AppError from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { getPagination } from "../helpers/pagination.js";
import productRepository from "../repositories/product.repository.js";
import searchHistoryService from "./searchHistory.service.js";

const listProducts = async (query, userId) => {
  const { products, totalItems } = await productRepository.findProducts(query);

  const filters = {
    category: query.category,
    brand: query.brand,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    rating: query.rating,
    sort: query.sort,
  };

  const hasSearchContext = Boolean(
    query.search ||
      query.category ||
      query.brand ||
      query.minPrice !== undefined ||
      query.maxPrice !== undefined ||
      query.rating !== undefined,
  );

  if (userId && hasSearchContext) {
    await searchHistoryService.saveSearchHistory(userId, query.search, filters);
  }

  return {
    items: products,
    pagination: getPagination({
      page: query.page,
      limit: query.limit,
      totalItems,
    }),
  };
};

const getProductById = async (productId) => {
  if (!mongoose.isValidObjectId(productId)) {
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
  }

  const product = await productRepository.findProductById(productId);

  if (!product) {
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
  }

  return product;
};

const createProduct = async (payload) => productRepository.createProduct(payload);

const updateProduct = async (productId, payload) => {
  if (!mongoose.isValidObjectId(productId)) {
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
  }

  const product = await productRepository.updateProductById(productId, payload);

  if (!product) {
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
  }

  return product;
};

const deleteProduct = async (productId) => {
  if (!mongoose.isValidObjectId(productId)) {
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
  }

  const product = await productRepository.deleteProductById(productId);

  if (!product) {
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
  }
};

export default {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
