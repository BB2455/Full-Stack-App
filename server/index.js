import dotenv from 'dotenv'
import database from './database'
import app from './server.js'

dotenv.config()

const PORT = process.env.PORT || 5000

try {
  database.connect()
  console.info('Database connected...')
} catch (error) {
  console.error(error)
}

app.listen(PORT, () => console.info(`Server running on port: ${PORT}`))
  .catch((error) => console.error(error.message))
