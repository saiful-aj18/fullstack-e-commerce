import Product from "../models/Product.js";

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      price,
      description,
      category,
      image,
      stock
    } = req.body;

    if (
      !title ||
      price === undefined ||
      !description ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, price, description and category are required."
      });
    }

    const lastProduct = await Product.findOne()
      .sort({ id: -1 });

    const newId = lastProduct
      ? lastProduct.id + 1
      : 1;

    const product = await Product.create({
      id: newId,
      title,
      price,
      description,
      category,
      image: image || "",
      stock: stock || 0
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    const {
      title,
      price,
      description,
      category,
      image,
      stock
    } = req.body;

    if (title !== undefined) {
      product.title = title;
    }

    if (price !== undefined) {
      product.price = price;
    }

    if (description !== undefined) {
      product.description = description;
    }

    if (category !== undefined) {
      product.category = category;
    }

    if (image !== undefined) {
      product.image = image;
    }

    if (stock !== undefined) {
      product.stock = stock;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      id: Number(req.params.id)
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};