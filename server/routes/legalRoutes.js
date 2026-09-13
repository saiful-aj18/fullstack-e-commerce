import express from "express";

import {
  getLegalContent
} from "../controllers/legalController.js";

const router = express.Router();

router.get(
  "/:type",
  getLegalContent
);

export default router;