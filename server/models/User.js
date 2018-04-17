const mongoose = require('mongoose')
const to = require('await-to-js').to
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const User = new Schema({
  pseudo: { type: String, required: true },
  password: { type: String, required: true, select: false },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  fullName: String,
  city: String,
  state: String,
  requestedTrades: [{ type: Schema.Types.ObjectId, ref: 'Trade' }],
  acceptedTrades: [{ type: Schema.Types.ObjectId, ref: 'Trade' }]
})

User.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(this.password, salt)
      this.password = hash
      return next()
    } catch (error) {
      return next(new Error('Could not save user'))
    }
  }
})

module.exports = mongoose.model('User', User)
