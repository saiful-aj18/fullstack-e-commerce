import express from "express";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} from "../controllers/wishlistController.js";

import {
  protect
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getWishlist)
  .post(protect, addToWishlist)
  .delete(protect, clearWishlist); // NEW — clear whole wishlist

router.delete(
  "/:productId",
  protect,
  removeFromWishlist
);

export default router;
