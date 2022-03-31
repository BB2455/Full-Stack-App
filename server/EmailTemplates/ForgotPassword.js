import { sendEmail } from '../utils/emailHandler'

export const handleForgotPasswordEmail = async (email, token) => {
  const url = `http://localhost:3000/reset-password?token=${token}`
  const message = {
    html: `<p>Click Here to reset your account:</p><a href=${url} target="_blank">${url}</a>`,
    subject: 'Node Mailer Password Reset',
    text: `Click here to reset your account: \n ${url}`,
    to: email,
  }
  await sendEmail(message)
}
