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
  { MONGODB_URI, PORT } = process.env,
  userRoutes = require('./routes/user'),
  bookRoutes = require('./routes/book'),
  requestRoutes = require('./routes/request'),
  app = express()

// Db connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('coonnected to db'))
  .catch(e => console.log(`DB ERROR : ${e}`))

// App initialization
app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(mongoSanitize())
  .use(expressSanitizer())
  .use(helmet())
  // Routes
  .use('api/books', bookRoutes)
  .use('api/users', userRoutes)
  .use('api/requests', requestRoutes)
  // Listen
  .listen(PORT, () => console.log(`Server running on port ${PORT}`))
