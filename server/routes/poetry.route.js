import express from "express";
import Poetry from "../models/poetry.model.js";

const router = express.Router();

// 获取所有诗词
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const poems = await Poetry.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ like: -1 }); //
    const totalPoems = await Poetry.countDocuments();
    res.json({
      poems,
      currentPage: page,
      totalPages: Math.ceil(totalPoems / limit),
      totalPoems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取唐诗300首
router.get("/tang-300", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const tangPoems = await Poetry.find({ dynasty: "tang" })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalPoems = await Poetry.countDocuments({ dynasty: "tang" });
    res.json({
      poems: tangPoems,
      currentPage: page,
      totalPages: Math.ceil(totalPoems / limit),
      totalPoems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取宋词300首
router.get("/song-300", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const songPoems = await Poetry.find({ dynasty: "song" })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalPoems = await Poetry.countDocuments({ dynasty: "song" });
    res.json({
      poems: songPoems,
      currentPage: page,
      totalPages: Math.ceil(totalPoems / limit),
      totalPoems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/random-poems", async (req, res) => {
  try {
    const tangPoems = await Poetry.aggregate([
      { $match: { dynasty: "tang" } },
      { $sample: { size: 5 } },
    ]);
    const songPoems = await Poetry.aggregate([
      { $match: { dynasty: "song" } },
      { $sample: { size: 5 } },
    ]);

    res.json({
      tangPoems,
      songPoems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/like/:id", async (req, res) => {
  try {
    const poem = await Poetry.findById(req.params.id);
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    poem.like += 1;
    await poem.save();

    res.json({ poem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 高级搜索
router.post("/search", async (req, res) => {
  const { author, title, tags, dynasty, page = 1, limit = 10 } = req.body;
  let query = {};

  if (author) query.author = new RegExp(author, "i");
  if (title) query.title = new RegExp(title, "i");
  if (tags) query.tags = { $in: tags };
  if (dynasty) query.dynasty = dynasty;

  try {
    const totalPoems = await Poetry.countDocuments(query);
    const poems = await Poetry.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      poems,
      currentPage: page,
      totalPages: Math.ceil(totalPoems / limit),
      totalPoems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取特定诗词
router.get("/:id", getPoem, (req, res) => {
  res.json(res.poem);
});

// 按ID获取诗词的中间件
async function getPoem(req, res, next) {
  let poem;
  try {
    poem = await Poetry.findById(req.params.id);
    if (poem == null) {
      return res.status(404).json({ message: "Cannot find poem" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.poem = poem;
  next();
}

export default router;
