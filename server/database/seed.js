// eslint-disable-next-line unicorn/import-index
import fs from 'fs'
import dotenv from 'dotenv'
import User from '../models/user.js'
// eslint-disable-next-line unicorn/import-index
import database from './index.js'

dotenv.config()

const data = fs.readFileSync('users.json')
const users = JSON.parse(data)

const addUser = async (user) => {
  const newUser = new User({
    createdAt: user.created_at,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  })
  await newUser.save()
}

const seed = async () => {
  try {
    await database.connect()
    console.info('DB Connected')
    await User.deleteMany({})
    for (const user of users) {
      await addUser(user)
    }

    console.info('Seeded Users')
  } catch (error) {
    console.error('Error Seeding: ', error)
  }
}

const runSeed = async () => {
  console.info('Seeding...')
  try {
    await seed()
  } catch (error) {
    console.error('Error: ', error)
    process.exitCode = 1
  } finally {
    console.info('Closing Connection...')
    await database.close()
    console.info('Database Closed')
  }
}

runSeed()
