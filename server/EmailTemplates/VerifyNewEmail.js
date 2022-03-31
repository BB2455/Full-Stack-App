import { sendEmail } from '../utils/emailHandler'

export const handleNewEmailVerification = async (email, url) => {
  const message = {
    html: `<p>Click Here to verify your new email:</p><a href=${url} target="_blank">${url}</a>`,
    subject: 'Node Mailer Email Verification',
    text: `Click here to verify your new email: \n ${url}`,
    to: email,
  }
  await sendEmail(message)
}
