import jwt from 'jsonwebtoken'

const generateTokens = (id, username, data) => {
  const user = {...data, id, username}
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m', issuer: 'fullStackAppServer', subject: username})
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d', issuer: 'fullStackAppServer', subject: username})
  return {accessToken, refreshToken}
}

export default generateTokens
