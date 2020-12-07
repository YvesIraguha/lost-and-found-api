import { Router } from 'express';
import Profile from '../controllers/profile/updateProfile';
import authentication from '../middlewares/authentication';
import {
  profileValidation,
  photoValidation
} from '../middlewares/userValidation';

const profileRouter = new Router();

profileRouter
  .post('/image', authentication, photoValidation, Profile.profileImage)
  .put('/', authentication, profileValidation, Profile.updateProfile);

export default profileRouter;
