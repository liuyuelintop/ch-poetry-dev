import Poetry from "../models/poetry.model.js";
import Shijing from "../models/shijing.model.js";

const buildPoetryQuery = ({ author, title }) => {
  let query = {};
  if (author) query.author = new RegExp(author, "i");
  if (title) query.title = new RegExp(title, "i");
  return query;
};

const buildShijingQuery = ({ title, chapter, section }) => {
  let query = {};
  if (title) query.title = new RegExp(title, "i");
  if (chapter) query.chapter = new RegExp(chapter, "i");
  if (section) query.section = new RegExp(section, "i");
  return query;
};

export const searchPoetry = async (req, res) => {
  const { author, title, page = 1, limit = 10 } = req.query;
  const query = buildPoetryQuery({ author, title });

  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchShijing = async (req, res) => {
  const { title, chapter, section, page = 1, limit = 10 } = req.query;
  const query = buildShijingQuery({ title, chapter, section });

  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
