import express from "express";
import validatePagination from "../middlewares/validation/validatePagination.js";
import {
  getAllPoems,
  getRandomPoems,
  likePoem,
  getPoemsByDynasty,
} from "../controllers/poetry.controller.js";
import applyValidators from "../middlewares/validation/applyValidators.js";

const router = express.Router();

router.get("/", validatePagination, getAllPoems);
router.get("/dynasty/:dynasty", applyValidators, getPoemsByDynasty);
router.get("/random-poems", getRandomPoems);
router.post("/like/:id", likePoem);

export default router;
