import { Router } from 'express';
import {
  signUpValidation,
  loginValidation
} from '../../middlewares/userValidation';
import controller from '../../controllers/authentication';

const authRouter = new Router();

authRouter
  .post('/signUp', signUpValidation, controller.signupController)
  .post('/login', loginValidation, controller.loginController);
export default authRouter;
