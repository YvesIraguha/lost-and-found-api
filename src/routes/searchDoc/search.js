import { Router } from 'express';
import SearchController from '../../controllers/searchDoc/index';
import authentication from '../../middlewares/authentication';

const searchRouter = new Router();

searchRouter.get('/', authentication, SearchController.searchDocument);

export default searchRouter;
