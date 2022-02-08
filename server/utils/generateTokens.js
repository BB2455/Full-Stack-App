import jwt from 'jsonwebtoken'

const generateTokens = (userData, data) => {
  const user = {
    ...data,
    id: userData._id,
    username: userData.username,
    verified_email: userData.verified_email,
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10m',
    issuer: 'fullStackAppServer',
    subject: userData.username,
  })
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
    issuer: 'fullStackAppServer',
    subject: userData.username,
  })
  return { accessToken, refreshToken }
}

export default generateTokens
