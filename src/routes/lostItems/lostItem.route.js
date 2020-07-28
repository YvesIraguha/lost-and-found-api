import express from 'express';
import authentication from '../../middlewares/authentication';
import lostItemsController from '../../controllers/lostDoc';
import docValidation from '../../middlewares/docValidation';

const lostRouter = express.Router();

lostRouter
  .post('/lost', authentication, docValidation, lostItemsController.lostItem)
  .post('/found', authentication, docValidation, lostItemsController.foundItem)
  .delete('/:_id', authentication, lostItemsController.deleteItem)
  .get('/lost/all', authentication, lostItemsController.allLost)
  .get('/found/all', authentication, lostItemsController.allFound);

export default lostRouter;
