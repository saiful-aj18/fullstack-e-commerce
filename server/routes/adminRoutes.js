import express from "express";

import {
  protect
} from "../middlewares/authMiddleware.js";

import {
  isAdmin
} from "../middlewares/adminMiddleware.js";

import {
  getDashboard,
  getUsers,
  updateUserStatus,
  updateUserRole,
  getOrders,
  updateOrderStatus,
  getReviews,
  deleteReview
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect);
router.use(isAdmin);


// Dashboard
router.get(
  "/dashboard",
  getDashboard
);


// Users
router.get(
  "/users",
  getUsers
);

router.put(
  "/users/:id/status",
  updateUserStatus
);

router.put(
  "/users/:id/role",
  updateUserRole
);


// Orders
router.get(
  "/orders",
  getOrders
);

router.put(
  "/orders/:id/status",
  updateOrderStatus
);


// Reviews
router.get(
  "/reviews",
  getReviews
);

router.delete(
  "/reviews/:id",
  deleteReview
);

export default router;