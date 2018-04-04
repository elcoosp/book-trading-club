const express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  passport = require('passport'),
  filter = require('../filters'),
  to = require('await-to-js').to,
  { JWT_TOKEN } = process.env

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    req.user
      ? res.json({ user: filter.user.sended(req.user) })
      : res.status(401).json({ error: 'Not auuthorized' })
  }
)

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user
      })
    }
    req.login(user, { session: false }, err => {
      if (err) res.send(err)

      const token = jwt.sign(user.toJSON(), JWT_TOKEN)

      return res.json({ user: filter.user.sended(user), token })
    })
  })(req, res)
})

module.exports = router
