import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(
      `${products.length} products inserted successfully.`
    );

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Product seed failed:");
    console.error(error);

    process.exit(1);
  }
};

seedProducts();