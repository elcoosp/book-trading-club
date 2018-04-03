const mongoose = require('mongoose'),
  privatePaths = require('mongoose-private-paths'),
  uniqueValidator = require('mongoose-unique-validator'),
  { Schema } = mongoose

const UserSchema = new Schema({
  nameFirst: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  nameLast: { type: String, required: true },
  password: { type: String, required: true, private: true, maxlength: 60 },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

UserSchema.set('toJSON', { virtuals: true })
UserSchema.plugin(uniqueValidator)
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
