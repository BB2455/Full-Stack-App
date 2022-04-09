import Boom from '@hapi/boom'
import { ACCESS } from '../constants/secretTypes.js'
import decodeToken from './decodeToken.js'

const authJWT = async (req, res, next) => {
  if (process.env.NODE_ENV === 'TEST') return next()
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      const decodedData = decodeToken(token, ACCESS)
      if (decodedData.expired) throw new Error('Invalid Or Expired Token')
      req.userID = decodedData?.id
    }

    next()
  } catch (error) {
    res.json(Boom.unauthorized(error.message))
  }
}

export default authJWT
