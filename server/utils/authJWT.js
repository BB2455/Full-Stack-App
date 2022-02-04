import Boom from '@hapi/boom'
import decodeAccessToken from './decodeAccessToken.js'

const authJWT = async (req, res, next) => {
  if (process.env.NODE_ENV === 'TEST') return next()
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      const decodedData = decodeAccessToken(token)
      if (decodedData.expired) throw new Error('Invalid Or Expired Token')
      req.userID = decodedData?.id
    }

    next()
  } catch (error) {
    res.json(Boom.unauthorized(error.message))
  }
}

export default authJWT
