import Joi from '@hapi/joi';

export const docValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    documentTitle: Joi.string().min(5).max(50).required(),
    documentID: Joi.string().min(5).max(50),
    location: Joi.object().keys({
      district: Joi.string().min(4).max(50),
      sector: Joi.string().min(4).max(50)
    }),
    reward: Joi.number().min(0)
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ msg: error.details[0].message });
  return next();
};

export const editValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    documentTitle: Joi.string().min(5).max(50),
    documentID: Joi.string().min(5).max(50),
    location: Joi.object().keys({
      district: Joi.string().min(4).max(50),
      sector: Joi.string().min(4).max(50)
    }),
    reward: Joi.number().min(0)
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  return next();
};
