import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

import User from '../models/user_model';

// loads in .env file if needed
dotenv.config({ silent: true });

// options for local strategy, we'll use email AS the username
// not have separate ones
const localOptions = { usernameField: 'email' };

// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

// username/email + password authentication strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  // should find user by email and check password
  let user;
  let isMatch;

  try {
    user = await User.findOne({ email });
    if (user) { isMatch = await user.comparePassword(password); return done(null, user); }
  } catch (error) {
    // All comments got from documetation of Passport
    // if an exception occurred while verifying the credentials (for example, if the database is not available) then done returns an error to Passport
    return done(error);
  }

  if (!user) {
    // if a user does not exist, done should be invoked with false to indicate an authentication failure.
    return done(null, false);
  }
  if (!isMatch) {
    // if password is incorrect, done should be invoked with false to indicate an authentication failure.
    return done(null, false);
  }
  return done('error in localLogin');
});

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // is called with confirmed jwt we just need to confirm that user exits
  let user;
  try {
    user = await User.findById(payload.sub);
  } catch (error) {
    // if an exception occurred while verifying the credentials (for example, if the database is not available) then done returns an error to Passport, and return false to indicate failure to authenticate
    done(error, false);
  }
  if (user) {
    // if everything works, ie, there's an existing user, done supply Passport with the user that authenticated.
    done(null, user);
  } else {
    // otherwise, done should be invoked with false to indicate an authentication failure.
    done(null, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin); // for 'jwt'
passport.use(localLogin); // for 'local'

// middleware functions to use in routes
export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });