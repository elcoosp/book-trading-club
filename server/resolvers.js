const Book = require('./models/Book')
const User = require('./models/User')
const Trade = require('./models/Trade')
const getFieldNames = require('graphql-list-fields')
const to = require('await-to-js').to
const { withAuth, checkPasswordsAndDeliverToken } = require('.//services/auth')

const { without, arrayWrap } = require('./utils')

const resolvers = {
  Query: {
    books: async (obj, { id }, ctx, info) => {
      const getData = id ? Book.findById(id) : Book.find({})

      const [e, bookOrBooks] = await to(getData)
      if (e) throw new Error('Could not get books')
      return arrayWrap(bookOrBooks).map(b => b.toObject())
    },

    user: withAuth(async (obj, { id }, ctx, info) => {
      const fields = getFieldNames(info)
        .filter(s => !s.includes('__typename'))
        .join(' ')

      const [e, user] = await to(User.findById(ctx.user._id))
      const [err, populatedUser] = await to(user.deepPopulate(fields))
      console.log(populatedUser)

      if (e || err) throw new Error('Could not get user')
      return populatedUser.toObject()
    })
  },
  Mutation: {
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
    },
    addBook: withAuth(async (obj, { title, author }, { user }, info) => {
      const [e, book] = await to(
        new Book({
          title,
          owner: user._id,
          author
        }).save()
      )
      // Register book in user books
      const [userFetchError, userFromDb] = await to(User.findById(user._id))
      userFromDb.books.push(book._id)
      const [userSaveError, userSaved] = await to(userFromDb.save())
      if (e || userFetchError || userSaveError)
        throw new Error('Could not add book')

      return book.toObject()
    }),
    addUser: async (obj, args, ctx, info) => {
      const [e, user] = await to(new User(args).save())
      if (e) throw new Error('Could not add user')
      return without`password`(user.toObject())
    },
    updateUser: withAuth((obj, args, ctx, info) => {
      return Promise.all([
        User.findOne({ pseudo: args.pseudo }),
        User.findById(ctx.user._id)
      ]).then(async ([pseudoAlreadyUsed, user]) => {
        if (
          !pseudoAlreadyUsed ||
          (pseudoAlreadyUsed && pseudoAlreadyUsed._id.equals(user._id))
        ) {
          user.set(args)
          const [saveError, updatedUser] = await to(user.save())
          if (saveError) throw new Error('Could not update user')
          return without`password`(updatedUser.toObject())
        } else throw new Error('Pseudo already used')
      })
    }),

    requestTrade: withAuth(async (obj, { book }, ctx, info) => {
      try {
        const trade = await new Trade({ book, requester: ctx.user._id })
          .save()
          .then(doc => doc.populate('requester book').execPopulate())

        const userSaved = await User.findByIdAndUpdate(
          ctx.user._id,
          { $push: { requestedTrades: trade._id } },
          { new: true }
        )

        const bookFetched = await Book.findById(book).populate('owner', '_id')

        const ownerFetched = await User.findById(bookFetched.owner._id)
        ownerFetched.waitingTrades.push(bookFetched._id)
        const ownerSaved = await ownerFetched.save()
        return trade.toObject()
      } catch (e) {
        throw new Error('Could not request trade')
      }
    }),

    acceptTrade: withAuth(async (obj, { trade }, ctx, info) => {
      try {
        const tradeFetched = await Trade.findById(trade).populate(
          'book requester'
        )
        tradeFetched.set({ accepted: true })
        const tradeSaved = await tradeFetched.save()

        // Exchange books between users, first erase book from context user books
        const userFetched = await User.findById(ctx.user._id)
        userFetched.set({
          books: userFetched.books.filter(b => b._id !== tradeSaved.book._id)
        })
        const userSaved = await userFetched.save()

        // Then add the book to the requester books array
        const requesterFetched = await User.findById(tradeSaved.requester)
        requesterFetched.books.push(tradeSaved.book._id)
        const requesterSaved = await requesterFetched.save()

        // Edit book owner on Book model
        const bookFetched = await Book.findById(tradeSaved.book._id)
        bookFetched.set({ owner: requesterSaved._id })
        const bookSaved = await bookFetched.save()
        return tradeSaved.toObject()
      } catch (e) {
        throw new Error('Could not accept trade')
      }
    })
  }
}
module.exports = resolvers
