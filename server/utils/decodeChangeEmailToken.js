import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const TOKEN_SECRET = process.env.CHANGE_EMAIL_TOKEN_SECRET

const decodeChangeEmailToken = (token) => {
  try {
    return jwt.verify(token, TOKEN_SECRET)
  } catch {
    throw new Error('Expired Token')
  }
}

export default decodeChangeEmailToken
