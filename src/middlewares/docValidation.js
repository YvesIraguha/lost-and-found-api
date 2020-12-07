import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import models from '../models/index';

const { LostItems: Item } = models;

export const docValidation = (req, res, next) => {
  const schema = Joi.object().keys({
    documentTitle: Joi.string().min(5).max(50).required(),
    documentID: Joi.string().min(5).max(50),
    location: Joi.object().keys({
      district: Joi.string().min(4).max(50),
      sector: Joi.string().min(4).max(50)
    }),
    reward: Joi.number().min(0),
    status: Joi.string().valid('lost', 'found', 'delivered').required()
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
    reward: Joi.number().min(0),
    status: Joi.string().valid('lost', 'found', 'delivered')
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  return next();
};

export const validateId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
    return res.status(404).json({ msg: 'Invalid ID' });
  }
  const registeredItem = await Item.findById(req.params._id);

  if (!registeredItem) {
    return res.status(404).json({ error: 'Document not found!' });
  }
  return next();
};

export const validateBatchUpdate = async (req, res, next) => {
  const schema = Joi.object().keys({
    items: Joi.array().items(
      Joi.object().keys({
        documentTitle: Joi.string().min(5).max(50),
        documentID: Joi.string().min(5).max(50),
        location: Joi.object().keys({
          district: Joi.string().min(4).max(50),
          sector: Joi.string().min(4).max(50)
        }),
        reward: Joi.number().min(0),
        _id: Joi.string().required(),
        status: Joi.string().valid('lost', 'found', 'delivered')
      })
    )
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  return next();
};
