import express from 'express';
import authentication from '../../middlewares/authentication';
import lostItemsController from '../../controllers/lostItems/lostItem';

const lostRouter = express.Router();

lostRouter
  .post('/lost', authentication, lostItemsController);

export default lostRouter;
