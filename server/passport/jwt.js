const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

module.exports = (new JWTStrategy({
    jwtFromRequest: req => req.signedCookies.jwt,
    jwtCookieName: 'jwt',
    secretOrKey: config.jwtSecret,
}, (jwtPayload, done) => {
    console.log(token);
    // if (Date.now() > jwtPayload.expires) {
    //     return done('jwt expired');
    // }
    return done(null, jwtPayload);
}
));;