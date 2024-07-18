import Joi from "joi";

/**
 * Validation schema for search queries.
 */
const searchSchema = Joi.object({
  author: Joi.string().allow("").optional(),
  title: Joi.string().allow("").optional(),
  chapter: Joi.string().allow("").optional(),
  section: Joi.string().allow("").optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
});

/**
 * Middleware to validate search query parameters.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateSearch = (req, res, next) => {
  // Convert empty strings to undefined
  const cleanedQuery = { ...req.query };
  Object.keys(cleanedQuery).forEach((key) => {
    if (cleanedQuery[key] === "") {
      cleanedQuery[key] = undefined;
    }
  });

  const { error, value } = searchSchema.validate(cleanedQuery);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.query = value;
  next();
};

export default validateSearch;
