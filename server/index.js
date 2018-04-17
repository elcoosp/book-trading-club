const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const resolvers = require('./resolvers')
const to = require('await-to-js').to
const jwt = require('jsonwebtoken')

const jwtVerify = (token, secret) =>
  jwt.verify(
    token,
    secret,
    (e, payload) =>
      new Promise((resolve, reject) => (e ? reject(e) : resolve(payload)))
  )
dotenv.config()
const { MONGODB_URI, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URI).then(() => console.log('CONNECTED TO DB'))

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  context: async ({ request: { headers } }) => {
    if (headers.authorization) {
      const token = headers.authorization.split('Bearer ')[1]
      const [e, user] = await to(jwtVerify(token, JWT_SECRET))
      return { user }
    }
  }
})
server.start(
  {
    port: PORT
  },
  () => console.log(`Server is running on ${PORT}`)
)
