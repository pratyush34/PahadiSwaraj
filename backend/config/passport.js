import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';

const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN || 'http://localhost:5000';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKEND_ORIGIN}/api/auth/google/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          if (!email) return done(null, false);

          const values = {
            name: profile.displayName || email.split('@')[0],
            email,
            provider: 'google',
            providerId: profile.id
          };

          let user = await User.findOne({ email });
          if (user) {
            user.provider = 'google';
            user.providerId = profile.id;
            await user.save();
            return done(null, user);
          }

          user = await User.create(values);
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${BACKEND_ORIGIN}/api/auth/github/callback`,
        scope: ['user:email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          if (!email) return done(null, false);

          const values = {
            name: profile.displayName || profile.username || email.split('@')[0],
            email,
            provider: 'github',
            providerId: profile.id
          };

          let user = await User.findOne({ email });
          if (user) {
            user.provider = 'github';
            user.providerId = profile.id;
            await user.save();
            return done(null, user);
          }

          user = await User.create(values);
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}

export default passport;
