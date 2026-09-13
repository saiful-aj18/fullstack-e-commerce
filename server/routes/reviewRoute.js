import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// ---------------------------------------------------------
// Create Review  --  EXISTING route, fixed field names
// POST /api/review
// body: { user, productId, productTitle, rating, comment }
// ---------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const { user, productId, productTitle, rating, comment } = req.body;

    if (!user || !productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "User, product, rating and comment are required."
      });
    }

    const review = await Review.create({
      user,
      productId,
      productTitle,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ---------------------------------------------------------
// Show Reviews For a Product  --  NEW route
// (handy for Postman testing / a future product-details page)
// GET /api/review/:productId
// ---------------------------------------------------------
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
