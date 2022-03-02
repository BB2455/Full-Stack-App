import { sendEmail } from '../utils/emailHandler'

export const handleEmailVerification = async (email, url) => {
  const message = {
    html: `<p>Click Here to verify your account:</p><a href=${url} target="_blank">${url}</a>`,
    subject: 'Node Mailer Email Verification',
    text: `Click here to verify your account: \n ${url}`,
    to: email,
  }
  await sendEmail(message)
}
