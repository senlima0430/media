import { ApolloServer } from 'apollo-server-express'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import models from './models'

import { resolvers } from './resolvers'

const typeDefs = importSchema(`${__dirname}/typeDefs/schema.graphql`)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export const apollo = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV === 'development',
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context
    } else {
      return { models }
    }
  },
})
