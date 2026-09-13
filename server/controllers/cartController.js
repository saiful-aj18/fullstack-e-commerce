import Cart from "../models/Cart.js";

const getCart = async (
  req,
  res,
  next
) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (
  req,
  res,
  next
) => {
  try {
    const {
      productId,
      title,
      price,
      image,
      quantity = 1
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

    let cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    const existingItem =
      cart.items.find(
        (item) =>
          item.productId === Number(productId)
      );

    if (existingItem) {
      existingItem.quantity += Number(
        quantity
      );
    } else {
      cart.items.push({
        productId: Number(productId),
        title,
        price: Number(price),
        image,
        quantity: Number(quantity)
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message:
        "Product added to cart.",
      cart
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (
  req,
  res,
  next
) => {
  try {
    const {
      productId
    } = req.params;

    const {
      quantity
    } = req.body;

    if (
      !quantity ||
      Number(quantity) < 1
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be at least 1."
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found."
      });
    }

    const item = cart.items.find(
      (item) =>
        item.productId === Number(productId)
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found in cart."
      });
    }

    item.quantity = Number(quantity);

    await cart.save();

    res.status(200).json({
      success: true,
      message:
        "Cart updated successfully.",
      cart
    });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (
  req,
  res,
  next
) => {
  try {
    const {
      productId
    } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found."
      });
    }

    const initialLength =
      cart.items.length;

    cart.items = cart.items.filter(
      (item) =>
        item.productId !== Number(productId)
    );

    if (
      cart.items.length === initialLength
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found in cart."
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message:
        "Product removed from cart.",
      cart
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (
  req,
  res,
  next
) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found."
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message:
        "Cart cleared successfully.",
      cart
    });
  } catch (error) {
    next(error);
  }
};

export {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};