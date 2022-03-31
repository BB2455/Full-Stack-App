/* eslint-disable unicorn/import-index */
import dotenv from 'dotenv'
import { cronJob } from './cron/index.js'
import database from './database/index.js'
import app from './server.js'

dotenv.config()

const PORT = process.env.PORT || 5000

try {
  database.connect()
  console.info('Database connected...')
} catch (error) {
  console.error(error)
}

try {
  app.listen(PORT, () => console.info(`Server running on port: ${PORT}`))
} catch (error) {
  console.error(error.message)
}

cronJob.start()
