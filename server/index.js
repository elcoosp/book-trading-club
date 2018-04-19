const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const resolvers = require('./resolvers')
const to = require('await-to-js').to
const jwt = require('jsonwebtoken')
const { checkHeadersToSetUser } = require('./services/auth')
dotenv.config()
const { MONGODB_URI, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URI).then(() => console.log('CONNECTED TO DB'))

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  context: async ({ request: { headers } }) => ({
    user: await checkHeadersToSetUser(headers)
  })
})
server.start(
  {
    port: PORT
  },
  () => console.log(`Server is running on ${PORT}`)
)
