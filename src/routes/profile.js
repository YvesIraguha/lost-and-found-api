import { Router } from 'express';
import Profile from '../controllers/profile/updateProfile';
import upload from '../middlewares/multer';
import authentication from '../middlewares/authentication';
import { profileValidation } from '../middlewares/userValidation';
import asyncHandler from '../middlewares/asyncHandler';

const profileRouter = new Router();

profileRouter
  .post(
    '/image',
    authentication,
    upload.single('profilePicture'),
    asyncHandler(Profile.profileImage)
  )
  .put(
    '/',
    authentication,
    profileValidation,
    asyncHandler(Profile.updateProfile)
  );

export default profileRouter;
