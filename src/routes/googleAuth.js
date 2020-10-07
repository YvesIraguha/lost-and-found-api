import { Router } from 'express';
import googlePassport from '../middlewares/passport';
import controller from '../controllers/authentication';

const userRouter = new Router();

userRouter
  .use(googlePassport.initialize())
  .get(
    '/google',
    googlePassport.authenticate('google', { scope: ['profile', 'email'] })
  )
  .get(
    '/google/callback',
    googlePassport.authenticate('google', { failureRedirect: '/login' }),
    controller.googleAuthController
  );

export default userRouter;
