import { sendEmail } from '../utils/emailHandler'

export const handleChangeEmailVerification = async (email, tokens) => {
  const verifyURL = `${process.env.BASE_URL}/verifyChangeEmail?token=${tokens.verify}`
  const cancelURL = `${process.env.BASE_URL}/verifyChangeEmail?token=${tokens.cancel}`
  const message = {
    html: `
    <p>Click Here to verify your new email:</p>
    <a href=${verifyURL} target="_blank">${verifyURL}</a>
    <p>If you didn't make this change click here:</p>
    <a href=${cancelURL} target="_blank">${cancelURL}</a>
    <p>Make sure you change your password as soon as possible.</p>
    `,
    subject: 'Full Stack App Change Email Request',
    text: `Click here to verify your new email: \n 
    ${verifyURL} \n
    If you didn't make this change click here: \n
    ${cancelURL}
    Make sure you change your password as soon as possible.
    `,
    to: email,
  }
  await sendEmail(message)
}
