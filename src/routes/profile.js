import { Router } from 'express';
import Profile from '../controllers/profile/updateProfile';
import upload from '../middlewares/multer';
import authentication from '../middlewares/authentication';
import { profileValidation } from '../middlewares/userValidation';

const profileRouter = new Router();

profileRouter
  .post(
    '/image',
    authentication,
    upload.single('profilePicture'),
    Profile.profileImage
  )
  .put('/', authentication, profileValidation, Profile.updateProfile);

export default profileRouter;
