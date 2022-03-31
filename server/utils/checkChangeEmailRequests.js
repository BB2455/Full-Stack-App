import ChangeEmailModel from '../models/changeEmail'

export const checkChangeEmailRequests = async () => {
  const prevDate = new Date(new Date().setDate(new Date().getDate() - 3))
  const requests = await ChangeEmailModel.find({createdAt: { $lte: prevDate }})
  for (const request of requests) {
    await request.completeRequest()
  }
}
