import googleAuth from 'passport-google-oauth';
import passport from 'passport';
import models from '../models';
import config from '../../config/config';

const { User } = models;

const GoogleStrategy = googleAuth.OAuth2Strategy;
const {
  app: { clientID, clientSecret, callbackURL }
} = config;

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      const query = { platform: 'google', profileId: profile.id };
      const update = {
        platform: 'google',
        profileId: profile.id,
        email: profile.emails ? profile.emails[0].value : undefined,
        useraname: profile.displayName,
        firstName: profile.name.givenName,
        secondName: profile.name.familyName,
        photoUrl: profile.photos ? profile.photos[0].value : undefined,
        date: {
          timestamp: new Date()
        }
      };

      const options = { upsert: true, new: true };
      User.findOneAndUpdate(query, update, options, (err, user) => {
        if (err) return done(err);
        done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

export default passport;
