const to = require('await-to-js').to
const dotenv = require('dotenv')
dotenv.config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { without } = require('../utils')
const { JWT_SECRET } = process.env

const withAuth = resolver => (obj, args, ctx, info) => {
  if (ctx.user) return resolver(obj, args, ctx, info)
  else {
    throw new Error('You are not authorized')
  }
}

const jwtVerify = (token, secret) =>
  jwt.verify(
    token,
    secret,
    (e, payload) =>
      new Promise((resolve, reject) => (e ? reject(e) : resolve(payload)))
  )

const checkHeadersToSetUser = async headers => {
  if (headers.authorization) {
    const token = headers.authorization.split('Bearer ')[1]
    const [e, user] = await to(jwtVerify(token, JWT_SECRET))
    return user
  } else {
    return undefined
  }
}

const checkPasswordsAndDeliverToken = async (password, userFromDb) => {
  const passwordMatches = await bcrypt.compare(password, userFromDb.password)

  if (passwordMatches) {
    const token = jwt.sign(
      without`password`(userFromDb.toObject()),
      JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )
    return { token }
  } else throw new Error('User pseudo and password do not match')
}
module.exports = {
  withAuth,
  checkHeadersToSetUser,
  checkPasswordsAndDeliverToken
}
