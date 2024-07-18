import Joi from "joi";

const dynastySchema = Joi.string().valid("tang", "song").required();

const validateDynasty = (req, res, next) => {
  const { error } = dynastySchema.validate(req.params.dynasty);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export default validateDynasty;
