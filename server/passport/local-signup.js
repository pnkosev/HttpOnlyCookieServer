const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const encryption = require('../utilities/encryption');

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, email, done) => {
  const user = {
    username: username.trim(),
    email: email.trim(),
  }
  User
    .findOne({ username: username })
    .then(u => {
      if (u) {
        return done('Username already exists!');
      }

      const salt = encryption.generateSalt();
      user.salt = salt;
      user.hashedPassword = encryption.generateHashedPassword(salt, req.body.password);
      user.roles = ['User'];

      User
        .create(user)
        .then(() => {
          return done(null);
        })
        .catch(() => {
          return done('Something went wrong :( Check the form for errors.');
        })
    })
    .catch(err => {
      return done(err);
    })
})
