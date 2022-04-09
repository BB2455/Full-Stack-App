import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import {
  REFRESH,
  ACCESS,
  CHANGE_EMAIL,
} from '../constants/secretTypes'

dotenv.config()
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET
const CHANGE_EMAIL_SECRET = process.env.CHANGE_EMAIL_TOKEN_SECRET

const decodeToken = (token, secretType) => {
  try {
    switch (secretType) {
    case REFRESH:
      return jwt.verify(token, REFRESH_SECRET)
    case ACCESS:
      return jwt.verify(token, ACCESS_SECRET)
    case CHANGE_EMAIL:
      return jwt.verify(token, CHANGE_EMAIL_SECRET)
    default:
      throw new Error('Invalid Secret Type')
    }
  } catch {
    throw new Error('Expired Token')
  }
}

export default decodeToken
