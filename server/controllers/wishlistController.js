import Wishlist from "../models/Wishlist.js";

const getWishlist = async (
  req,
  res,
  next
) => {
  try {
    let wishlist =
      await Wishlist.findOne({
        user: req.user._id
      });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: []
      });
    }

    res.status(200).json({
      success: true,
      wishlist
    });
  } catch (error) {
    next(error);
  }
};

const addToWishlist = async (
  req,
  res,
  next
) => {
  try {
    const {
      productId,
      title,
      price,
      image
    } = req.body;

    if (
      !productId ||
      !title ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product information is required."
      });
    }

    let wishlist =
      await Wishlist.findOne({
        user: req.user._id
      });

    if (!wishlist) {
      wishlist =
        await Wishlist.create({
          user: req.user._id,
          products: []
        });
    }

    const alreadyExists =
      wishlist.products.some(
        (item) =>
          item.productId ===
          Number(productId)
      );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message:
          "Product already exists in wishlist."
      });
    }

    wishlist.products.push({
      productId: Number(productId),
      title,
      price: Number(price),
      image
    });

    await wishlist.save();

    res.status(200).json({
      success: true,
      message:
        "Product added to wishlist.",
      wishlist
    });
  } catch (error) {
    next(error);
  }
};

const removeFromWishlist = async (
  req,
  res,
  next
) => {
  try {
    const {
      productId
    } = req.params;

    const wishlist =
      await Wishlist.findOne({
        user: req.user._id
      });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message:
          "Wishlist not found."
      });
    }

    const initialLength =
      wishlist.products.length;

    wishlist.products =
      wishlist.products.filter(
        (item) =>
          item.productId !==
          Number(productId)
      );

    if (
      wishlist.products.length ===
      initialLength
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found in wishlist."
      });
    }

    await wishlist.save();

    res.status(200).json({
      success: true,
      message:
        "Product removed from wishlist.",
      wishlist
    });
  } catch (error) {
    next(error);
  }
};

// NEW — Clear Wishlist (mirrors clearCart in cartController.js)
const clearWishlist = async (
  req,
  res,
  next
) => {
  try {
    const wishlist =
      await Wishlist.findOne({
        user: req.user._id
      });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message:
          "Wishlist not found."
      });
    }

    wishlist.products = [];

    await wishlist.save();

    res.status(200).json({
      success: true,
      message:
        "Wishlist cleared successfully.",
      wishlist
    });
  } catch (error) {
    next(error);
  }
};

export {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
};

