import decode from 'jwt-decode'

export const getDecodedToken = (token) => {
  try {
    return decode(token)
  } catch (error) {
    return
  }
}