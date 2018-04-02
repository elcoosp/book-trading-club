const mongoose = require('mongoose'),
  { Schema } = mongoose

require('mongoose-type-url')

const BookSchema = new Schema({
  name: { type: String, required: true },
  cover: { type: Schema.Types.Url },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

const BookModel = mongoose.model('Book', BookSchema)

module.exports = BookModel
