import { Router } from 'express';
import jwt from 'jsonwebtoken';
import googlePassport from '../controllers/users/google';
import facebookPasssport from '../controllers/users/facebook';

const userRouter = new Router();

const authSuccessRedirect = '/';
const authFailureRedirect = '/login';

userRouter.get(
  '/auth/google',
  googlePassport.authenticate('google', { scope: ['profile', 'email'] })
);

userRouter.get(
  '/auth/google/callback',
  googlePassport.authenticate('google', {
    failureRedirect: authFailureRedirect
  }),
  (req, res) => {
    try {
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({ _id: req.user._id }, secretKey, {
        algorithm: 'HS256'
      });
      res.json({ token, user: req.user });
    } catch (error) {
      res.json({ msg: 'Internal error,' });
    }
  }
);
userRouter.get(
  '/auth/facebook',
  facebookPasssport.authenticate('facebook', {
    scope: ['profile', 'email']
  })
);

userRouter.get(
  '/auth/facebook/callback',
  facebookPasssport.authenticate('facebook', {
    failureRedirect: authFailureRedirect,
    successRedirect: authSuccessRedirect
  }),
  (req, res) => {
    try {
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({ _id: req.user._id }, secretKey, {
        algorithm: 'HS256'
      });
      res.json({ token, user: req.user });
    } catch (error) {
      res.json({ msg: 'Internal error,' });
    }
  }
);
export default userRouter;
