import validatePagination from "./validatePagination.js";
import validateDynasty from "./validateDynasty.js";

/**
 * Middleware to apply multiple validation checks.
 * This middleware calls individual validation functions.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const applyValidators = (req, res, next) => {
  const validators = [validatePagination, validateDynasty];

  for (let validate of validators) {
    const { error, value } = validate.schema.validate(
      validate.source === "query" ? req.query : req.params
    );
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (validate.source === "query") {
      req.query = value;
    } else if (validate.source === "params") {
      req.params = value;
    }
  }
  next();
};

export default applyValidators;
