import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String,
      default: ""
    }
  },
  {
    _id: false
  }
);

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    products: [wishlistItemSchema]
  },
  {
    timestamps: true
  }
);

const Wishlist = mongoose.model(
  "Wishlist",
  wishlistSchema
);

export default Wishlist;