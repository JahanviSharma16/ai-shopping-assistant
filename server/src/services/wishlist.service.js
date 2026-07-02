import mongoose from "mongoose";
import AppError from "../utils/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import productRepository from "../repositories/product.repository.js";
import wishlistRepository from "../repositories/wishlist.repository.js";

const addToWishlist = async (userId, productId) => {
  if (!mongoose.isValidObjectId(productId)) {
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
  }

  const product = await productRepository.findProductById(productId);

  if (!product) {
    throw new AppError("Product not found", HTTP_STATUS.NOT_FOUND);
  }

  const existingItem = await wishlistRepository.findWishlistItem(userId, productId);

  if (existingItem) {
    throw new AppError("Product already exists in wishlist", HTTP_STATUS.CONFLICT);
  }

  await wishlistRepository.createWishlistItem({
    user: userId,
    product: productId,
  });

  return product;
};

const removeFromWishlist = async (userId, productId) => {
  if (!mongoose.isValidObjectId(productId)) {
    throw new AppError("Wishlist item not found", HTTP_STATUS.NOT_FOUND);
  }

  const wishlistItem = await wishlistRepository.deleteWishlistItem(userId, productId);

  if (!wishlistItem) {
    throw new AppError("Wishlist item not found", HTTP_STATUS.NOT_FOUND);
  }
};

const getWishlist = async (userId) => {
  const items = await wishlistRepository.findWishlistByUser(userId);

  return items.map((item) => item.product).filter(Boolean);
};

export default {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
