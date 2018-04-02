// Global packages
const express = require('express'),
  dotenv = require('dotenv').config(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  mongoSanitize = require('express-mongo-sanitize'),
  helmet = require('helmet'),
  morgan = require('morgan'),
  expressSanitizer = require('express-sanitizer'),
  to = require('await-to-js').to,
  // App modules and constants
  { MONGODB_URI, PORT } = process.env,
  userRoutes = require('./routes/users'),
  bookRoutes = require('./routes/books'),
  requestRoutes = require('./routes/requests'),
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
  .use(morgan('tiny'))
  .use(expressSanitizer())
  .use(helmet())
  // Routes
  .use('/api/books', bookRoutes)
  .use('/api/users', userRoutes)
  .use('/api/requests', requestRoutes)
  // Listen
  .listen(PORT, () => console.log(`Server running on port ${PORT}`))
