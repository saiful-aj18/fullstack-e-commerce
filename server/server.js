import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import legalRoutes from "./routes/legalRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoute from "./routes/reviewRoute.js";


import {
  notFound,
  errorHandler
} from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "*"
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "E-commerce API is running successfully."
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/wishlist",
  wishlistRoutes
);

app.use(
  "/api/legal",
  legalRoutes
);

app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoute);

app.use(notFound);

app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});