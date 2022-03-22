import crypto from 'crypto'
import ResetToken from '../models/resetToken'

const generateResetToken = async () => {
  const token = crypto.randomBytes(32).toString('hex')
  const currentToken = await ResetToken.findOne({reset_token: token})
  if (!currentToken) return token
  return generateResetToken()
}

export default generateResetToken
