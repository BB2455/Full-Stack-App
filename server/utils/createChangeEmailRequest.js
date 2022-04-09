import changeEmailModel from '../models/changeEmail'

export const createChangeEmailRequest = async (user, newEmail) => {
  if (user.email === newEmail.toLowerCase().trim()) throw new Error('New Email Can\'t Be Current Email')
  const change = new changeEmailModel({
    newEmail,
    userId: user._id,
  })
  await change.createRequest(user.email)
}
