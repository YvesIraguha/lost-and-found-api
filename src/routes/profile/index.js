import { Router } from 'express';
import profile from '../../controllers/profile/profileImg';
import upload from '../../middlewares/multer';
import authentication from '../../middlewares/authentication';

const profileRouter = new Router();

profileRouter.post(
  '/image',
  authentication,
  upload.single('profilePicture'),
  profile
);

export default profileRouter;
