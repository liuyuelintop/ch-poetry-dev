import express from "express";
import {
  searchPoetry,
  searchShijing,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/poetry", searchPoetry);
router.get("/shijing", searchShijing);

export default router;
