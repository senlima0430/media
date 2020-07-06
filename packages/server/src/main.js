import '@babel/polyfill'
import { createServer } from 'http'

import { app } from './app'
import { apollo } from './apollo'
import db from './models'

async function main() {
  await db.sequelize.sync()

  apollo.applyMiddleware({ app })
  const httpServer = createServer(app)

  httpServer.listen(8080)
}

main()
