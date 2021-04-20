import { Router } from 'express';
import authentication from '../middlewares/authentication';
import itemController from '../controllers/items';
import {
  docValidation,
  editValidation,
  validateBatchUpdate,
  validateId
} from '../middlewares/docValidation';
import asyncHandler from '../middlewares/asyncHandler';

const lostRouter = new Router();

lostRouter
  .post(
    '/lost',
    authentication,
    docValidation,
    asyncHandler(itemController.recordLostItem)
  )
  .post(
    '/found',
    authentication,
    docValidation,
    asyncHandler(itemController.recordFoundItem)
  )
  .get('/lost', authentication, asyncHandler(itemController.getAllLost))
  .get('/found', authentication, asyncHandler(itemController.getAllFound))
  .get('/:_id', authentication, asyncHandler(itemController.getItem))
  .put(
    '/:_id',
    authentication,
    editValidation,
    validateId,
    asyncHandler(itemController.updateItem)
  )
  .put(
    '/',
    authentication,
    validateBatchUpdate,
    asyncHandler(itemController.batchUpdates)
  )
  .get('/search', authentication, asyncHandler(itemController.searchItem));

export default lostRouter;
