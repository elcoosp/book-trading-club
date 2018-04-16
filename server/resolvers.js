const Book = require('./models/Book')
const User = require('./models/User')
const to = require('await-to-js').to
const arrayWrap = v => (!v ? [] : Array.isArray(v) ? v : [v])

const resolvers = {
  Query: {
    books: async (obj, { id }, context, info) => {
      const getData = id ? Book.findById(id) : Book.find({})
      const [e, book] = await to(getData)
      return e ? e : arrayWrap(book)
    }
  },
  Mutation: {
    addBook: async (obj, { title, author }, context, info) => {
      const [e, book] = await to(new Book({ title, author }).save())
      return e ? e : book
    },
    addUser: async (obj, args, context, info) => {
      const [e, user] = await to(new User(args).save())
      return e ? e : user
    }
  }
}
module.exports = resolvers
