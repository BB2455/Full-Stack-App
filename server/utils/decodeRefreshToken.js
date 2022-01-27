import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET

const decodeRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET)
  } catch {
    throw new Error('Expired Token')
  }
}

export default decodeRefreshToken