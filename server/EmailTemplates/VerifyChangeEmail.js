import { sendEmail } from '../utils/emailHandler'

export const handleChangeEmailVerification = async (email, url, url2) => {
  const message = {
    html: `
    <p>Click Here to verify your new email:</p>
    <a href=${url} target="_blank">${url}</a>
    <p>If you didn't make this change click here:</p>
    <a href=${url2} target="_blank">${url2}</a>
    <p>Make sure you change your password as soon as possible.</p>
    `,
    subject: 'Node Mailer Email Verification',
    text: `Click here to verify your new email: \n 
    ${url} \n
    If you didn't make this change click here: \n
    ${url2}
    Make sure you change your password as soon as possible.
    `,
    to: email,
  }
  await sendEmail(message)
}
