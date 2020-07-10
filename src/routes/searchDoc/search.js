import { Router } from 'express';
import SearchController from '../../controllers/searchDoc/searchFoundItem';
import authentication from '../../middlewares/authentication';


const searchRouter = new Router();

searchRouter
.post('/lost', authentication, SearchController.searchLostItem)
.post('/found', authentication, SearchController.searchFoundItem);


export default searchRouter;
