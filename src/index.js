const mongoose = require('mongoose'),
  dotenv = require('dotenv').config(),
  to = require('await-to-js').to,
  { MONGODB_URI } = process.env,
  User = require('./models/User'),
  Book = require('./models/Book')

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('coonnected to db'))
  .catch(e => console.log(`DB ERROR : ${e}`))
