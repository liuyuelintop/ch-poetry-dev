import Poetry from "../models/poetry.model.js";
import asyncHandler from "express-async-handler";
export const getAllPoems = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const poems = await Poetry.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ like: -1 });
  const totalPoems = await Poetry.countDocuments();
  res.json({
    poems,
    currentPage: page,
    totalPages: Math.ceil(totalPoems / limit),
    totalPoems,
  });
});

export const getPoemsByDynasty = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const dynasty = req.params.dynasty;
  const poems = await Poetry.find({ dynasty })
    .skip((page - 1) * limit)
    .limit(limit);
  const totalPoems = await Poetry.countDocuments({ dynasty });
  res.json({
    poems,
    currentPage: page,
    totalPages: Math.ceil(totalPoems / limit),
    totalPoems,
  });
});

const getRandomPoemsByDynasty = async (dynasty, size) => {
  try {
    return await Poetry.aggregate([
      { $match: { dynasty } },
      { $sample: { size } },
    ]);
  } catch (err) {
    throw new Error(
      `Error fetching poems from dynasty ${dynasty}: ${err.message}`
    );
  }
};

export const getRandomPoems = asyncHandler(async (req, res) => {
  const [tangPoems, songPoems] = await Promise.all([
    getRandomPoemsByDynasty("tang", 5),
    getRandomPoemsByDynasty("song", 5),
  ]);
  const poems = [...tangPoems, ...songPoems];
  res.status(200).json({
    success: true,
    poems,
    message: "Random poems fetched successfully",
  });
});

export const likePoem = async (req, res) => {
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
};
