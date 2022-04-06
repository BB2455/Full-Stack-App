import { sendEmail } from '../utils/emailHandler'

export const handleNewEmailVerification = async (email, tokens) => {
  const verifyURL = `${process.env.BASE_URL}/verifyChangeEmail?token=${tokens.verify}`
  const message = {
    html: `<p>Click Here to verify your new email:</p><a href=${verifyURL} target="_blank">${verifyURL}</a>`,
    subject: 'Node Mailer Email Verification',
    text: `Click here to verify your new email: \n ${verifyURL}`,
    to: email,
  }
  await sendEmail(message)
}
