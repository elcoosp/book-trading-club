const Book = require('./models/Book')
const User = require('./models/User')
const Trade = require('./models/Trade')
const to = require('await-to-js').to
const { withAuth, checkPasswordsAndDeliverToken } = require('.//services/auth')

const { without, arrayWrap } = require('./utils')

const resolvers = {
  Query: {
    books: async (obj, { id }, ctx, info) => {
      const getData = id ? Book.findById(id) : Book.find({})

      const [e, bookOrBooks] = await to(getData)
      console.log(bookOrBooks)

      return e ? e : arrayWrap(bookOrBooks).map(b => b.toObject())
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
      else return checkPasswordsAndDeliverToken(password, user)
    }
  },
  Mutation: {
    addBook: withAuth(async (obj, { title, author }, ctx, info) => {
      const [e, book] = await to(
        new Book({
          title,
          author
        }).save()
      )
      return e ? e : book.toObject()
    }),
    addUser: async (obj, args, ctx, info) => {
      const [e, user] = await to(new User(args).save())

      return e ? e : without`password`(user.toObject())
    },
    updateUser: withAuth(async (obj, args, ctx, info) => {
      const [e, user] = await to(User.findById(ctx.user._id))
      user.set(args)
      const [saveError, updatedUser] = await to(user.save())

      return e || saveError
        ? e || saveError
        : without`password`(updatedUser.toObject())
    }),
    requestTrade: withAuth(async (obj, { id }, ctx, info) => {
      const [e, trade] = await to(
        new Trade({ bookId: id, requester: ctx.user.id }).save()
      )
      return e ? e : trade.toObject()
    })
  }
}
module.exports = resolvers
