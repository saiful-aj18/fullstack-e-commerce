import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import {
  protect
} from "../middlewares/authMiddleware.js";

import {
  isAdmin
} from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProduct
);

router.post(
  "/",
  protect,
  isAdmin,
  createProduct
);

router.put(
  "/:id",
  protect,
  isAdmin,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  isAdmin,
  deleteProduct
);

export default router;