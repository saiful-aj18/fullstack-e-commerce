import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


// GET ALL CATEGORIES
router.get(
  "/products/categories",
  async (req, res) => {
    try {
      const categories = await Product.distinct(
        "category"
      );

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);


// GET PRODUCTS BY CATEGORY
router.get(
  "/products/category/:category",
  async (req, res) => {
    try {
      const category = decodeURIComponent(
        req.params.category
      );

      const products = await Product.find({
        category: {
          $regex: `^${category}$`,
          $options: "i"
        }
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);


// GET ALL PRODUCTS
router.get(
  "/products",
  async (req, res) => {
    try {
      const products = await Product.find()
        .sort({ id: 1 });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);


// GET SINGLE PRODUCT
router.get(
  "/products/:id",
  async (req, res) => {
    try {
      const product = await Product.findOne({
        id: Number(req.params.id)
      });

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

export default router;