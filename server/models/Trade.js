const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accepted: { type: Boolean, required: true }
})

module.exports = mongoose.model('Book', Book)
