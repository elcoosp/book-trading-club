const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  passportJWT = require('passport-jwt'),
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt,
  bcrypt = require('bcrypt'),
  to = require('await-to-js').to,
  User = require('../models/User'),
  { JWT_TOKEN } = process.env

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const [e, user] = await to(User.findOne({ username }))

    if (e) done(e)
    else if (!user)
      done(null, false, {
        message: 'Incorrect username'
      })
    else {
      const [e, response] = await to(bcrypt.compare(password, user.password))

      e
        ? done(e)
        : response
          ? done(null, user, {
              message: 'Logged in successfully'
            })
          : done(null, false, {
              message: 'Incorrect password'
            })
    }
  })
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_TOKEN
    },
    (jwtPayload, done) =>
      jwtPayload
        ? done(null, jwtPayload)
        : done('An error occured  during authentication')
  )
)
