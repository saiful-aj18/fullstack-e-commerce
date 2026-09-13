import mongoose from "mongoose";

// Each ordered product is stored as a snapshot (same shape as Cart items),
// NOT as a ref to a "Product" model — this app has no Product collection,
// product data comes from an external product API (numeric productId).
const orderItemSchema = new mongoose.Schema(
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
    },

    quantity: {
      type: Number,
      default: 1
    }
  }
  // no { _id: false } here on purpose — each order line item keeps its own
  // _id so it can be used as a stable React key on Orders/Invoice pages
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    products: [orderItemSchema],

    totalPrice: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
