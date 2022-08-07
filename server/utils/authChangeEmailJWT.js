import Boom from '@hapi/boom'
import { CHANGE_EMAIL } from '../constants/secretTypes.js'
import decodeToken from './decodeToken.js'

const authChangeEmailJWT = async (req, res, next) => {
  if (process.env.NODE_ENV === 'TEST') return next()
  try {
    const {token} = req.params
    if (token) {
      const decodedData = decodeToken(token, CHANGE_EMAIL)
      if (decodedData.expired) throw new Error('Invalid Or Expired Token')
      req.requestId = decodedData?.requestId
      req.token = decodedData?.token
      req.type = decodedData?.sub
    }

    next()
  } catch (error) {
    res.json(Boom.unauthorized(error.message))
  }
}

export default authChangeEmailJWT
