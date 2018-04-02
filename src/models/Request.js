const mongoose = require('mongoose'),
  { Schema } = mongoose

const RequestSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  requesterId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

const RequestModel = mongoose.model('Request', RequestSchema)

module.exports = RequestModel
