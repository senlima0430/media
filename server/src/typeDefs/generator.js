const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const { print } = require('graphql')
const { loadFilesSync, mergeTypeDefs } = require('graphql-tools')

const schemaPosition = path.resolve(__dirname, 'schema.graphql')

if (fs.existsSync(schemaPosition)) {
  rimraf(schemaPosition, err => {
    if (err) throw new Error(err)

    const loadedFiles = loadFilesSync(`${__dirname}/**/*.graphql`)
    const typeDefs = mergeTypeDefs(loadedFiles, { all: true })
    const printedTypeDefs = print(typeDefs)
    fs.writeFileSync(schemaPosition, printedTypeDefs)
  })
}
