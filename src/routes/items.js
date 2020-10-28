import express from 'express';
import authentication from '../middlewares/authentication';
import itemController from '../controllers/lostDoc/index';
import {
  docValidation,
  editValidation,
  validateBatchUpdate,
  validateId
} from '../middlewares/docValidation';

const lostRouter = express.Router();

lostRouter
  .post('/lost', authentication, docValidation, itemController.recordLostItem)
  .post('/found', authentication, docValidation, itemController.recordFoundItem)
  .get('/lost', authentication, itemController.getAllLost)
  .get('/found', authentication, itemController.getAllFound)
  .get('/:_id', authentication, itemController.getItem)
  .put(
    '/:_id',
    authentication,
    editValidation,
    validateId,
    itemController.updateItem
  )
  .put('/', authentication, validateBatchUpdate, itemController.batchUpdates);

export default lostRouter;
