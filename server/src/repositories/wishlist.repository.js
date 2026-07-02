import Wishlist from "../models/wishlist.model.js";

const createWishlistItem = async (payload) => Wishlist.create(payload);

const findWishlistItem = async (userId, productId) =>
  Wishlist.findOne({ user: userId, product: productId });

const findWishlistByUser = async (userId) =>
  Wishlist.find({ user: userId })
    .populate("product")
    .sort({ createdAt: -1 });

const deleteWishlistItem = async (userId, productId) =>
  Wishlist.findOneAndDelete({ user: userId, product: productId });

export default {
  createWishlistItem,
  findWishlistItem,
  findWishlistByUser,
  deleteWishlistItem,
};
