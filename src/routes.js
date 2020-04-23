import express from 'express';
import lostItemsController from './controllers/lostItemsController';

const lostRouter = express.Router();

lostRouter
  .post('/', lostItemsController.recordLostItem)
  .get('/', lostItemsController.getAllLostItems);

export default lostRouter;
