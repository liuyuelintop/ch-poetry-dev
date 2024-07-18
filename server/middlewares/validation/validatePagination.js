import Joi from "joi";

/**
 * Pagination validation schema using Joi.
 */
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
});

/**
 * Middleware to validate pagination parameters.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validatePagination = (req, res, next) => {
  const { error, value } = paginationSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.query = value;
  next();
};

export default validatePagination;
