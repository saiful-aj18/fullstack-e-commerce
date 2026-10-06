import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";


// ================================
// DASHBOARD
// ================================

const getDashboard = async (
  req,
  res,
  next
) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalReviews,
      revenueResult,
      recentOrders
    ] = await Promise.all([
      User.countDocuments(),

      Product.countDocuments(),

      Order.countDocuments(),

      Review.countDocuments(),

      Order.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalPrice"
            }
          }
        }
      ]),

      Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    const revenue =
      revenueResult[0]?.total || 0;

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalReviews,
        revenue
      },

      recentOrders
    });
  } catch (error) {
    next(error);
  }
};


// ================================
// USERS
// ================================

const getUsers = async (
  req,
  res,
  next
) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    next(error);
  }
};


// ================================
// USER STATUS
// ================================

const updateUserStatus = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    user.isActive = Boolean(
      req.body.isActive
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "User status updated.",
      user
    });
  } catch (error) {
    next(error);
  }
};


// ================================
// USER ROLE
// ================================

const updateUserRole = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    if (
      !["user", "admin"].includes(
        req.body.role
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid role."
      });
    }

    user.role = req.body.role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User role updated.",
      user
    });
  } catch (error) {
    next(error);
  }
};


// ================================
// ORDERS
// ================================

const getOrders = async (
  req,
  res,
  next
) => {
  try {
    const orders = await Order.find()
      .populate(
        "user",
        "name email phone address"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    next(error);
  }
};


// ================================
// ORDER STATUS
// ================================

const updateOrderStatus = async (
  req,
  res,
  next
) => {
  try {
    const {
      status
    } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status."
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found."
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated.",
      order
    });
  } catch (error) {
    next(error);
  }
};


// ================================
// REVIEWS
// ================================

const getReviews = async (
  req,
  res,
  next
) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    next(error);
  }
};


const deleteReview = async (
  req,
  res,
  next
) => {
  try {
    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found."
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted."
    });
  } catch (error) {
    next(error);
  }
};


export {
  getDashboard,
  getUsers,
  updateUserStatus,
  updateUserRole,
  getOrders,
  updateOrderStatus,
  getReviews,
  deleteReview
};