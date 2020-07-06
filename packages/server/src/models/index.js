const Sequelize = require('sequelize')

const dbConfig = require('../config/database').default
const { Video } = require('./video')

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const config = dbConfig[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: 'mysql',
    host: config.host,
    port: 3306,
    logging: process.env.NODE_ENV !== 'test' ? console.log : false,
  }
)

const models = {
  video: Video.init(sequelize, Sequelize),
}

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize,
}

module.exports = db
