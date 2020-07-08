import path from 'path'
import { loadFilesSync, mergeResolvers } from 'graphql-tools'

export const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, './**/*.resolvers.js'))
)
