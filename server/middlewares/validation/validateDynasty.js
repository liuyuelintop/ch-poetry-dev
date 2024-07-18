import Joi from "joi";

/**
 * Dynasty validation schema using Joi.
 */
const dynastySchema = Joi.string().valid("tang", "song").required();

/**
 * Middleware to validate dynasty parameter.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validateDynasty = (req, res, next) => {
  const { error } = dynastySchema.validate(req.params.dynasty);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
export default validateDynasty;
