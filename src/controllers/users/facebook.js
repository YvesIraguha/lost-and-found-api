import passport from 'passport';
import FacebookAuth from 'passport-facebook';
import User from '../../models/user';

passport.use(
  new FacebookAuth(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/api/v1/users/auth/facebook/callback',
      profileFields: [
        'id',
        'name',
        'emails',
        'displayName',
        'picture.type(large)'
      ]
    },
    (accessToken, refreshToken, profile, done) => {
      const query = { platform: 'facebook', profileId: profile.id };
      console.log(process.env.FACEBOOK_APP_ID);
      const update = {
        platform: 'facebook',
        profileId: profile.id,
        email: profile.emails ? profile.emails[0].value : undefined,
        displayName: profile.displayName,
        givenName: profile.name.givenName,
        familyName: profile.name.familyName,
        avatarUrl: profile.photos ? profile.photos[0].value : undefined,
        lastLogin: {
          timestamp: new Date()
        }
      };

      const options = { upsert: true, new: true };

      User.findOneAndUpdate(query, update, options, (err, user) =>
        err ? done(err) : done(null, user)
      );
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

export default passport;
