import Joi from '@hapi/joi';

export const signUpValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    secondName: Joi.string().required(),
    username: Joi.string().min(4).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().min(10).required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  return next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(4),
    email: Joi.string().required().email().required(),
    password: Joi.string().min(6).required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  return next();
};

export const profileValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4),
    secondName: Joi.string().min(4),
    phoneNumber: Joi.string().min(10),
    username: Joi.string().min(4)
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  return next();
};
