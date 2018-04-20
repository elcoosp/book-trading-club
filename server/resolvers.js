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
    addBook: withAuth(async (obj, { title, author }, { user }, info) => {
      const [e, book] = await to(
        new Book({
          title,
          owner: user._id,
          author
        }).save()
      )
      // Register book in user books
      const [userError, userFromDb] = await to(User.findById(user._id))
      userFromDb.books.push(book._id)
      const [userSaveError, userSaved] = await to(userFromDb.save())

      return e || userError || userSaveError
        ? e || userError || userSaveError
        : book.toObject()
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
    requestTrade: withAuth(async (obj, { book }, ctx, info) => {
      const [e, trade] = await to(
        new Trade({ book, requester: ctx.user._id })
          .save()
          .then(doc => doc.populate('requester book').execPopulate())
      )

      return e ? e : trade.toObject()
    }),
    acceptTrade: withAuth(async (obj, { trade }, ctx, info) => {
      const [tradeFetchError, tradeFetched] = await to(
        Trade.findById(trade).populate('book requester')
      )
      tradeFetched.set({ accepted: true })
      const [saveError, tradeSaved] = await to(tradeFetched.save())

      // Exchange books between users, first erase book from context user books
      const [userFetchError, user] = await to(User.findById(ctx.user._id))
      user.set({ books: user.books.filter(b => b._id !== tradeSaved.book._id) })
      const [userSaveError, updatedUser] = await to(user.save())

      // Then add the book to the requester books array
      const [requesterFetchError, requester] = await to(
        User.findById(tradeSaved.requester)
      )
      requester.books.push(tradeSaved.book._id)
      const [requesterSaveError, requesterSaved] = await to(requester.save())

      // Edit book owner
      const [bookFetchError, bookFromDb] = await to(
        Book.findById(tradeSaved.book._id)
      )
      bookFromDb.set({ owner: requesterSaved._id })

      const [bookSaveError, bookSaved] = await to(bookFromDb.save())
      return saveError ||
        userFetchError ||
        userSaveError ||
        requesterFetchError ||
        requesterSaveError ||
        bookFetchError ||
        bookSaveError
        ? saveError ||
            userFetchError ||
            userSaveError ||
            requesterFetchError ||
            requesterSaveError ||
            bookFetchError ||
            bookSaveError
        : tradeSaved.toObject()
    })
  }
}
module.exports = resolvers
