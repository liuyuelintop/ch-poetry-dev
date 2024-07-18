import express from "express";
import {
  getAllShijingPoems,
  likeShijingPoem,
  getShijingPoemById,
  searchShijingPoems,
} from "../controllers/shijing.controller.js";

const router = express.Router();

router.get("/", getAllShijingPoems);
router.post("/like/:id", likeShijingPoem);
router.get("/:id", getShijingPoemById);
router.post("/search", searchShijingPoems);

export default router;
