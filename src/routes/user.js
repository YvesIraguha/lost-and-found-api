import { Router } from 'express';
import jwt from 'jsonwebtoken';
import googlePassport from '../controllers/user';

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
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({ _id: req.user._id }, secretKey, {
        algorithm: 'HS256'
      });
      res.header('authentication', token).json({ token, user: req.user });
    } catch (error) {
      res.json({ msg: 'Internal error,' });
    }
  }
);

export default userRouter;
