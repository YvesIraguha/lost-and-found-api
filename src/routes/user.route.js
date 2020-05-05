import { Router } from 'express';
import jwt from 'jsonwebtoken';
import googlePassport from '../controllers/users/user';
import config from '../../config/config';

const userRouter = new Router();

userRouter.use(googlePassport.initialize());

userRouter.get(
  '/auth/google',
  googlePassport.authenticate('google', { scope: ['profile', 'email'] })
);

userRouter.get(
  '/auth/google/callback',
  googlePassport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    try {
      const { secretKey } = config.app;
      const token = jwt.sign({ _id: req.user._id }, secretKey, {
        algorithm: 'HS256'
      });
      res.status(200).json({ token, user: req.user });
    } catch (error) {
      res.status(500).json({ msg: 'Internal error,' });
    }
  }
);

export default userRouter;
