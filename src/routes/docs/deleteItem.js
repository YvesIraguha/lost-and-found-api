import { Router } from 'express';
import deleteItem from '../../controllers/docs/deleteDoc';
import authentication from '../../middlewares/authentication';

const deleteRouter = new Router();

deleteRouter
.delete('/:_id', authentication, deleteItem);

export default deleteRouter;