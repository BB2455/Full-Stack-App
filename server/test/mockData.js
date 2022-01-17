import bcrypt from 'bcryptjs'
import Admin from '../models/admin.js'
import User from '../models/user.js'

export const data = [
  {
    email: 'ran@dom.com',
    first_name: 'Ran',
    last_name: 'Dom',
  },
  {
    email: 'Sec@ret.com',
    first_name: 'Sec',
    last_name: 'Ret',
  },
  {
    email: 'some@thing.com',
    first_name: 'Some',
    last_name: 'Thing',
  },
  {
    email: 'first@name.com',
    first_name: 'First',
    last_name: 'Name',
  },
  {
    email: 'last@name.com',
    first_name: 'Last',
    last_name: 'Name',
  },
  {
    email: 'j@p.com',
    first_name: 'J',
    last_name: 'P',
  },
  {
    email: 'ad@min.com',
    first_name: 'Ad',
    last_name: 'Min',
  },
  {
    email: 'pass@word.com',
    first_name: 'Pass',
    last_name: 'Word',
  },
  {
    email: 'mon@go.com',
    first_name: 'Mon',
    last_name: 'Go',
  },
  {
    email: 'data@base.com',
    first_name: 'Data',
    last_name: 'Base',
  },
  {
    email: 'net@work.com',
    first_name: 'Net',
    last_name: 'Work',
  },
  {
    email: 'ad@vance.com',
    first_name: 'Ad',
    last_name: 'Vance',
  },
]

export const populateDataBase = async (num, done) => {
  for (let index = 0; index < num; index++) {
    const user = Math.floor(Math.random() * data.length)
    const newUser = new User(data[user])
    try {
      await newUser.save()
    } catch (error) {
      return done ? done(error) : error
    }
  }
}

export const createAdmin = async (admin, password, done) => {
  const newPassword = await bcrypt.hash(password, 12)
  const newAdmin = new Admin({ password: newPassword, username: admin })
  try {
    await newAdmin.save()
  } catch (error) {
    return done ? done(error) : error
  }
}
