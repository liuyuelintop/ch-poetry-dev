import express from "express";
import {
  getAllShijingPoems,
  likeShijingPoem,
} from "../controllers/shijing.controller.js";
import validatePagination from "../middlewares/validation/validatePagination.js";

const router = express.Router();

router.get("/", validatePagination, getAllShijingPoems);
router.post("/like/:id", likeShijingPoem);

export default router;
