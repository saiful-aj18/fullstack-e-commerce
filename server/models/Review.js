import mongoose from "mongoose";

// productId is a Number (from the external product API), matching the
// same pattern used by Cart and Wishlist — NOT an ObjectId ref, since
// there is no local "Product" model in this app.
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    productId: {
      type: Number,
      required: true
    },

    productTitle: {
      type: String,
      default: ""
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
