import { Router } from 'express';
import Profile from '../../controllers/profile/profileImg';
import upload from '../../middlewares/multer';
import authentication from '../../middlewares/authentication';

const profileRouter = new Router();

profileRouter
  .post(
    '/image',
    authentication,
    upload.single('profilePicture'),
    Profile.profileImage
  )
  .put('/', authentication, Profile.updateProfile);

export default profileRouter;
