import googleAuth from 'passport-google-oauth';
import passport from 'passport';
import User from '../../models/user';

const GoogleStrategy = googleAuth.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      const query = { platform: 'google', profileId: profile.id };

      const update = {
        platform: 'google',
        profileId: profile.id,
        email: profile.emails ? profile.emails[0].value : undefined,
        displayName: profile.displayName,
        givenName: profile.name.givenName,
        familyName: profile.name.familyName,
        photoUrl: profile.photos ? profile.photos[0].value : undefined,
        lastLogin: {
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
