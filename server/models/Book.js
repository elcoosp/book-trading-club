const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Book', Book)
