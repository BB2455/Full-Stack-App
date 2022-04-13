import { sendEmail } from '../utils/emailHandler'

export const handleEmailVerification = async (email, token) => {
  const url = `${process.env.BASE_URL}/verify/${token}`
  const message = {
    html: `<p>Click Here to verify your account:</p><a href=${url} target="_blank">${url}</a>`,
    subject: 'Full Stack App Email Verification',
    text: `Click here to verify your account: \n ${url}`,
    to: email,
  }
  await sendEmail(message)
}
