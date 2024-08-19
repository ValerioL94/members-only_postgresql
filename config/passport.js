const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../db/queries');

const strategy = new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      const user = await db.getUserByEmail(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect E-mail' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
