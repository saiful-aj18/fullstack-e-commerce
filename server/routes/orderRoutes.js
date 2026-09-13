import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ---------------------------------------------------------
// Create Order (Checkout)  --  EXISTING route, logic fixed
// POST /api/order
// body: { user, products, totalPrice }
// ---------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;

    if (!user || !products || products.length === 0 || totalPrice === undefined) {
      return res.status(400).json({
        success: false,
        message: "User, products and totalPrice are required."
      });
    }

    const order = await Order.create({
      user,
      products,
      totalPrice
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
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
