import express from "express";
import products from "../data/products.js";

const router = express.Router();


// ==========================================
// 1. GET ALL CATEGORIES
// ==========================================

router.get("/products/categories", (req, res) => {
  const categories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  res.status(200).json(categories);
});


// ==========================================
// 2. GET PRODUCTS BY CATEGORY
// ==========================================

router.get("/products/category/:category", (req, res) => {
  const category = decodeURIComponent(req.params.category);

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );

  res.status(200).json(filteredProducts);
});


// ==========================================
// 3. GET ALL PRODUCTS
// ==========================================

router.get("/products", (req, res) => {
  res.status(200).json(products);
});


// ==========================================
// 4. GET SINGLE PRODUCT
// KEEP THIS LAST
// ==========================================

router.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json(product);
});


export default router;