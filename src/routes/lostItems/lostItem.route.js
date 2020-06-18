import express from 'express';
import authentication from '../../middlewares/authentication';
import lostItemsController from '../../controllers/lostDoc';
import {foundValidation} from '../../middlewares/validation';

const lostRouter = express.Router();

lostRouter
  .post('/lost', authentication, lostItemsController.lostItem)
  .post('/found', [authentication, foundValidation], lostItemsController.foundItem);

export default lostRouter;
