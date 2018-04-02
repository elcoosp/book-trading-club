const mongoose = require('mongoose'),
  privatePaths = require('mongoose-private-paths'),
  { Schema } = mongoose

const UserSchema = new Schema({
  nameFirst: { type: String, required: true },
  nameLast: { type: String, required: true },
  password: { type: String, required: true, private: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
