import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql'
import GraphQLUUID from 'graphql-type-uuid'

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date scalar type',
    serialize: value => value.getTime(),
    parseValue: value => new Date(value),
    parseLiteral: ast =>
      ast.kind === Kind.INT ? new Date(parseInt(ast.value, 10)) : null,
  }),
  UUID: GraphQLUUID,
}
