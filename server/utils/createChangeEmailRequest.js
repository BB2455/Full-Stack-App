import changeEmailModel from '../models/changeEmail'

export const createChangeEmailRequest = async (userId, userEmail, newEmail) => {
  const change = new changeEmailModel({
    newEmail,
    userId,
  })
  await change.createRequest(userEmail)
  await change.save()
}
