import Shijing from "../models/shijing.model.js";
import asyncHandler from "express-async-handler";

/**
 * Get all Shijing poems with pagination.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getAllShijingPoems = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

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
});

/**
 * Increment like count for a specific Shijing poem.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const likeShijingPoem = asyncHandler(async (req, res) => {
  const shijing = await Shijing.findById(req.params.id);
  if (!shijing) {
    return res.status(404).json({ message: "Shijing not found" });
  }

  shijing.like += 1;
  await shijing.save();

  res.json({ like: shijing.like });
});
