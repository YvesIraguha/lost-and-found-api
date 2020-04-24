import { Router } from 'express';
// import Lost from '../../models/user';
import googleAuth from 'passport-google-oauth';
import passport from 'passport';

const router = new Router();
const GoogleStrategy = googleAuth.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
      return done();
    }
  )
);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

module.exports = router;
