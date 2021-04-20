import { Router } from 'express';
import {
  signUpValidation,
  loginValidation
} from '../middlewares/userValidation';
import controller from '../controllers/authentication';
import asyncHandler from '../middlewares/asyncHandler';

const authRouter = new Router();

authRouter
  .post('/signUp', signUpValidation, asyncHandler(controller.signupController))
  .post('/login', loginValidation, asyncHandler(controller.loginController));
export default authRouter;
