import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET

const decodeAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET)
  } catch {
    return { expired: true }
  }
}

export default decodeAccessToken
