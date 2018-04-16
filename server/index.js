const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const resolvers = require('./resolvers')
dotenv.config()
const { MONGODB_URI, PORT } = process.env

mongoose.connect(MONGODB_URI).then(() => console.log('CONNECTED TO DB'))

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  context: {
    db: mongoose.connection
  }
})
server.start(
  {
    port: PORT
  },
  () => console.log(`Server is running on ${PORT}`)
)
