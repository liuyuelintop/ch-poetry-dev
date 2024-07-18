import express from "express";
import {
  searchPoetry,
  searchShijing,
} from "../controllers/search.controller.js";
import validateSearch from "../middlewares/validation/validateSearch.js";

const router = express.Router();

router.get("/poetry", validateSearch, searchPoetry);
router.get("/shijing", validateSearch, searchShijing);

export default router;
