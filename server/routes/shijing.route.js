import express from "express";
import Shijing from "../models/shijing.model.js";

const router = express.Router();

// 获取所有诗经
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const shijingPoems = await Shijing.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalPoems = await Shijing.countDocuments();
    res.json({
      poems: shijingPoems,
      currentPage: page,
      totalPages: Math.ceil(totalPoems / limit),
      totalPoems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/like/:id", async (req, res) => {
  try {
    const shijing = await Shijing.findById(req.params.id);
    if (!shijing) {
      return res.status(404).json({ message: "Shijing not found" });
    }

    shijing.like += 1;
    await shijing.save();

    res.json({ like: shijing.like });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取特定诗经
router.get("/:id", async (req, res) => {
  try {
    const poem = await Shijing.findById(req.params.id);
    if (poem == null) {
      return res.status(404).json({ message: "Cannot find poem" });
    }
    res.json(poem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 高级搜索
router.post("/search", async (req, res) => {
  const { title, chapter, section } = req.body;
  let query = {};

  if (title) query.title = new RegExp(title, "i");
  if (chapter) query.chapter = new RegExp(chapter, "i");
  if (section) query.section = new RegExp(section, "i");

  try {
    const poems = await Shijing.find(query);
    res.json(poems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
