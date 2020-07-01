import Joi from '@hapi/joi';

export default (req, res, next) => {
  const schema = Joi.object().keys({
    documentName: Joi.string().min(5).max(50).required(),
    documentNumber: Joi.string().min(5).max(50).required(),
    district: Joi.string().min(4).max(50).required(),
    sector: Joi.string().min(3).max(50).required(),
    isRewarded: Joi.boolean(),
    price: Joi.string()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  return next();
};