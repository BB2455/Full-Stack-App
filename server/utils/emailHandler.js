import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'outlook',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async (message) => {
  const fullMessage = Object.assign(
    { from: `Node Mailer <${EMAIL}>` },
    message
  );
  try {
    await transporter.sendMail(fullMessage);
  } catch (error) {
    console.error('Something went wrong with email', error);
  }
};

export const handleEmailVerification = async (email, url) => {
  const message = {
    to: email,
    subject: 'Node Mailer Email Verification',
    text: `Click here to verify your account: \n ${url}`,
    html: `<p>Click Here to verify your account:</p><a href=${url} target="_blank">${url}</a>`,
  };
  await sendEmail(message);
};

export const handleForgotPasswordEmail = async (email, url) => {
  const message = {
    to: email,
    subject: 'Node Mailer Password Reset',
    text: `Click here to reset your account: \n ${url}`,
    html: `<p>Click Here to reset your account:</p><a href=${url} target="_blank">${url}</a>`,
  };
  await sendEmail(message);
};
