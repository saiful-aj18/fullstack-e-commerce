import express from "express";
import Order from "../models/Order.js";
import {
  protect
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  async (req, res) => {
    try {
      const {
        products,
        totalPrice
      } = req.body;

      if (
        !products ||
        products.length === 0 ||
        totalPrice === undefined
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Products and totalPrice are required."
        });
      }

      const order = await Order.create({
        user: req.user._id,
        products,
        totalPrice
      });

      res.status(201).json({
        success: true,
        message:
          "Order created successfully.",
        order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

// ---------------------------------------------------------
// Show Single Order (for Invoice page)  --  NEW route
// GET /api/order/single/:orderId
// ---------------------------------------------------------
router.get("/single/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found."
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ---------------------------------------------------------
// Show User's Order List  --  EXISTING route, fixed
// (removed .populate("products.product") — there is no
// Product model, products are embedded snapshots now)
// GET /api/order/:userId
// ---------------------------------------------------------
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
