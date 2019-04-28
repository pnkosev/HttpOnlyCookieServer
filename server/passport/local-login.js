const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('../models/User');


module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const userToLogin = {
    username: username.trim(),
    password: password.trim()
  }

  User
    .findOne({ username: userToLogin.username })
    .then(user => {
      if (!user || !user.authenticate(userToLogin.password)) {
        const error = new Error('Incorrect username or password');
        error.name = 'IncorrectCredentialsError';
        return done(error)
      }

      const payload = {
        sub: user._id
      }
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
      const data = {
        username: user.username,
        userId: user._id
      };

      if (user.roles) {
        data.roles = user.roles
      };

      console.log('login-pass');

      return done(null, token, data);
    })
})
