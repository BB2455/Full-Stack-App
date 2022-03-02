import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()
const EMAIL = process.env.EMAIL
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

const transporter = nodemailer.createTransport({
  auth: {
    pass: EMAIL_PASSWORD,
    user: EMAIL,
  },
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
})

export const sendEmail = async (message) => {
  const fullMessage = { from: `Node Mailer <${EMAIL}>`, ...message }
  try {
    await transporter.sendMail(fullMessage)
  } catch (error) {
    console.error('Something went wrong with email', error)
  }
}
