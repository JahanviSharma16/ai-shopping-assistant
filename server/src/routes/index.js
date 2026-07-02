import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import wishlistRoutes from "./wishlist.routes.js";
import searchHistoryRoutes from "./searchHistory.routes.js";
import aiRoutes from "../ai/routes/ai.routes.js";

const router = Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/search-history", searchHistoryRoutes);
router.use("/ai", aiRoutes);

export default router;
