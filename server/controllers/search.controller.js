import Poetry from "../models/poetry.model.js";
import Shijing from "../models/shijing.model.js";
import asyncHandler from "express-async-handler";

/**
 * Build query for searching poetry.
 * @param {Object} params - Search parameters.
 * @param {string} params.author - Author name.
 * @param {string} params.title - Title of the poem.
 * @returns {Object} - Query object for MongoDB.
 */
const buildPoetryQuery = ({ author, title }) => {
  let query = {};
  if (author) query.author = new RegExp(author, "i");
  if (title) query.title = new RegExp(title, "i");
  return query;
};

/**
 * Build query for searching Shijing poems.
 * @param {Object} params - Search parameters.
 * @param {string} params.title - Title of the poem.
 * @param {string} params.chapter - Chapter of the poem.
 * @param {string} params.section - Section of the poem.
 * @returns {Object} - Query object for MongoDB.
 */
const buildShijingQuery = ({ title, chapter, section }) => {
  let query = {};
  if (title) query.title = new RegExp(title, "i");
  if (chapter) query.chapter = new RegExp(chapter, "i");
  if (section) query.section = new RegExp(section, "i");
  return query;
};

/**
 * Search poetry with pagination.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const searchPoetry = asyncHandler(async (req, res) => {
  const { author, title, page = 1, limit = 10 } = req.query;
  const query = buildPoetryQuery({ author, title });

  const totalPoems = await Poetry.countDocuments(query);
  const poems = await Poetry.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    poems,
    type: "poetry",
    currentPage: page,
    totalPages: Math.ceil(totalPoems / limit),
    totalPoems,
  });
});

/**
 * Search Shijing poems with pagination.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const searchShijing = asyncHandler(async (req, res) => {
  const { title, chapter, section, page = 1, limit = 10 } = req.query;
  const query = buildShijingQuery({ title, chapter, section });

  const totalPoems = await Shijing.countDocuments(query);
  const poems = await Shijing.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    poems,
    type: "shijing",
    currentPage: page,
    totalPages: Math.ceil(totalPoems / limit),
    totalPoems,
  });
});
