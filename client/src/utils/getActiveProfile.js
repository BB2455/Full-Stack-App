import decode from 'jwt-decode'

export const getActiveProfile = () => {
  try {
    const profile = JSON.parse(localStorage.getItem('profile'))
    decode(profile.accessToken)
    return profile
  } catch (error) {
    return
  }
}
