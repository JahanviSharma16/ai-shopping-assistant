import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import authenticate from "../middleware/auth.middleware.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.use(asyncHandler(authenticate));

router.get("/", asyncHandler(getWishlist));
router.post("/:productId", asyncHandler(addToWishlist));
router.delete("/:productId", asyncHandler(removeFromWishlist));

export default router;
