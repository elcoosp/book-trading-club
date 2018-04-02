const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  passportJWT = require('passport-jwt'),
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt,
  User = require('../models/User'),
  { JWT_TOKEN } = process.env

passport.use(
  new LocalStrategy((username, password, done) =>
    User.findOne({ username, password })
      .then(
        user =>
          !user
            ? done(null, false, {
                message: 'Incorrect username or password.'
              })
            : done(null, user, {
                message: 'Logged in successfully'
              })
      )
      .catch(e => done(e))
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_TOKEN
    },
    (jwtPayload, done) =>
      User.findById(jwtPayload.id)
        .then(user => done(null, user))
        .catch(err => done(err))
  )
)
