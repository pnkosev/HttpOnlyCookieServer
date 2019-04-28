var JwtCookieComboStrategy = require('passport-jwt-cookiecombo');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

module.exports = new JwtCookieComboStrategy({
    secretOrPublicKey: config.jwtSecret,
    jwtCookieName: 'jwt'
}, (payload, done) => {
    // console.log(payload.sub);
    console.log('we here yo!');
    return done(null, payload);
});