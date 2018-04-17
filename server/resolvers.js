const Book = require('./models/Book')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const to = require('await-to-js').to
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { without, arrayWrap } = require('./utils')
dotenv.config()
const { JWT_SECRET } = process.env

const resolvers = {
  Query: {
    books: async (obj, { id }, ctx, info) => {
      const getData = id ? Book.findById(id) : Book.find({})
      const [e, book] = await to(getData)
      return e ? e : arrayWrap(book.toObject())
    },

    login: async (obj, { pseudo, password }, ctx, info) => {
      const [e, user] = await to(
        User.findOne(
          {
            pseudo
          },
          '+password'
        )
      )
      if (e) throw new Error('An error occured')
      if (!user) throw new Error('User pseudo does not exist')
      else {
        const passwordMatches = await bcrypt.compare(password, user.password)
        if (passwordMatches) {
          const token = jwt.sign(
            without`password`(user.toObject()),
            JWT_SECRET,
            {
              expiresIn: '7d'
            }
          )
          return { token }
        } else throw new Error('User pseudo and password do not match')
      }
    }
  },
  Mutation: {
    addBook: async (obj, { title, author }, ctx, info) => {
      const [e, book] = await to(
        new Book({
          title,
          author
        }).save()
      )
      return e ? e : book.toObject()
    },
    addUser: async (obj, args, ctx, info) => {
      const [e, user] = await to(new User(args).save())

      return e ? e : without`password`(user.toObject())
    },
    updateUser: async (obj, args, ctx, info) => {
      const [e, user] = await to(User.findById(ctx.id))
      return e ? e : without`password`(user.toObject())
    }
  }
}
module.exports = resolvers
