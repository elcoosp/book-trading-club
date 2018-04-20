const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Book', Book)

acceptTrade: withAuth(async (obj, { trade }, ctx, info) => {
  const [e, tradeRetrieved] = await to(Trade.findById(trade).populate('book'))
  tradeRetrieved.set({ accepted: true })
  const [saveError, tradeSaved] = await to(tradeRetrieved.save())
  // Exchange books between users
  tradeRetrieved.book.set()

  return e ? e : tradeSaved.toObject()
})
