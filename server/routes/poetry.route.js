import express from "express";
import validateDynasty from "../middlewares/validation/validateDynasty.js";
import validatePagination from "../middlewares/validation/validatePagination.js";
import {
  getAllPoems,
  getRandomPoems,
  likePoem,
  getPoemById,
  getPoemsByDynasty,
} from "../controllers/poetry.controller.js";

const router = express.Router();

router.get("/", getAllPoems);
router.get(
  "/dynasty/:dynasty",
  validatePagination,
  validateDynasty,
  getPoemsByDynasty
);
router.get("/random-poems", getRandomPoems);
router.post("/like/:id", likePoem);
router.get("/:id", getPoemById, (req, res) => {
  res.json(res.poem);
});

export default router;
