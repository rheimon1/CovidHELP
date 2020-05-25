const connection = require('../database/connection');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt
require('dotenv/config')

const params = {
  secretOrKey: process.env.authSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
  const strategy = new Strategy(params, (payload, done) => {
    connection('users')
      .where('id', payload.id)
      .first()
      .then(user => done(null, user ? {...payload } : false))
      .catch(err => done(err, false))
  });
  
  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false })
    }
  }