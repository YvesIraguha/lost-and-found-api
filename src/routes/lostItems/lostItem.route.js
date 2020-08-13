import express from 'express';
import authentication from '../../middlewares/authentication';
import lostItemsController from '../../controllers/lostDoc';
import { docValidation, editValidation} from '../../middlewares/docValidation';

const lostRouter = express.Router();

lostRouter
  .post('/lost', authentication, docValidation, lostItemsController.lostItem)
  .post('/found', authentication, docValidation, lostItemsController.foundItem)
  .get('/lost', authentication, lostItemsController.allLost)
  .get('/found', authentication, lostItemsController.allFound)
  .put('/lost/:_id', authentication, editValidation, lostItemsController.updateItem)
  .put('/found/:_id', authentication, editValidation, lostItemsController.updateItem);

export default lostRouter;
