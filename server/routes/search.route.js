import express from "express";
import Poetry from "../models/poetry.model.js";
import Shijing from "../models/shijing.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { type, author, title, tags, dynasty, page = 1, limit = 10 } = req.body;
  let query = {};

  if (author) query.author = new RegExp(author, "i");
  if (title) query.title = new RegExp(title, "i");
  if (tags) query.tags = { $in: tags };
  if (dynasty) query.dynasty = dynasty;

  try {
    let totalPoems, poems;
    if (type === "poetry") {
      totalPoems = await Poetry.countDocuments(query);
      poems = await Poetry.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    } else if (type === "shijing") {
      totalPoems = await Shijing.countDocuments(query);
      poems = await Shijing.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }
    res.json({
      poems,
      type,
      currentPage: page,
      totalPages: Math.ceil(totalPoems / limit),
      totalPoems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
