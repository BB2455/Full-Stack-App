import { sendEmail } from '../utils/emailHandler'

export const handleForgotPasswordEmail = async (email, token) => {
  const url = `${process.env.BASE_URL}/reset-password?token=${token}`
  const message = {
    html: `<p>Click Here to reset your account password:</p><a href=${url} target="_blank">${url}</a>`,
    subject: 'Full Stack App - Forgot Password',
    text: `Click here to reset your account password: \n ${url}`,
    to: email,
  }
  await sendEmail(message)
}
