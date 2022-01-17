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
  port: 587,
  secure: false,
  service: 'outlook',
})

const sendEmail = async (message) => {
  const fullMessage = {from: `Node Mailer <${EMAIL}>`, ...message}
  try {
    await transporter.sendMail(fullMessage)
  } catch (error) {
    console.error('Something went wrong with email', error)
  }
}

export const handleEmailVerification = async (email, url) => {
  const message = {
    html: `<p>Click Here to verify your account:</p><a href=${url} target="_blank">${url}</a>`,
    subject: 'Node Mailer Email Verification',
    text: `Click here to verify your account: \n ${url}`,
    to: email,
  }
  await sendEmail(message)
}

export const handleForgotPasswordEmail = async (email, url) => {
  const message = {
    html: `<p>Click Here to reset your account:</p><a href=${url} target="_blank">${url}</a>`,
    subject: 'Node Mailer Password Reset',
    text: `Click here to reset your account: \n ${url}`,
    to: email,
  }
  await sendEmail(message)
}
