import wishlistService from "../services/wishlist.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const addToWishlist = async (req, res) => {
  const product = await wishlistService.addToWishlist(req.user.id, req.params.productId);

  return successResponse(res, "Product added to wishlist", product);
};

export const removeFromWishlist = async (req, res) => {
  await wishlistService.removeFromWishlist(req.user.id, req.params.productId);

  return successResponse(res, "Product removed from wishlist");
};

export const getWishlist = async (req, res) => {
  const products = await wishlistService.getWishlist(req.user.id);

  return successResponse(res, "Wishlist fetched successfully", products);
};
