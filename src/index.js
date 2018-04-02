// Global packages
const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  mongoSanitize = require('express-mongo-sanitize'),
  helmet = require('helmet'),
  expressSanitizer = require('express-sanitizer'),
  dotenv = require('dotenv').config(),
  to = require('await-to-js').to,
  // App modules and constants
  { MONGODB_URI } = process.env,
  User = require('./models/User'),
  Book = require('./models/Book'),
  app = express()

// App initialization
app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(mongoSanitize())
  .use(expressSanitizer())
  .use(helmet())

//Db connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('coonnected to db'))
  .catch(e => console.log(`DB ERROR : ${e}`))
