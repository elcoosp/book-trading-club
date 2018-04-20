const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Trade = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accepted: { type: Boolean, required: true, default: false }
})

module.exports = mongoose.model('Trade', Trade)
