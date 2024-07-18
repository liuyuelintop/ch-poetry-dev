import express from "express";
import validatePagination from "../middlewares/validation/validatePagination.js";
import validateDynasty from "../middlewares/validation/validateDynasty.js";
import {
  getAllPoems,
  getRandomPoems,
  likePoem,
  getPoemsByDynasty,
} from "../controllers/poetry.controller.js";

const router = express.Router();

router.get("/", validatePagination, getAllPoems);
router.get(
  "/dynasty/:dynasty",
  validatePagination,
  validateDynasty,
  getPoemsByDynasty
);
router.get("/random-poems", getRandomPoems);
router.post("/like/:id", likePoem);

export default router;
