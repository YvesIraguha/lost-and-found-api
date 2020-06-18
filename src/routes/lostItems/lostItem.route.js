import express from 'express';
import authentication from '../../middlewares/authentication';
import lostItemsController from '../../controllers/lostDoc';

const lostRouter = express.Router();

lostRouter
  .post('/lost', authentication, lostItemsController.lostItem)
  .post('/found', lostItemsController.foundItem);

export default lostRouter;
