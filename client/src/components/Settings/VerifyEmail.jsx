import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { resendVerificationEmail } from '../../api'

const VerifyEmail = () => {
  const [message, setMessage] = useState('')

  const sendEmail = async () => {
    try {
      const { data } = await resendVerificationEmail()
      console.log(data)
      if (data.isBoom) throw new Error(data.output.payload.message)
      setMessage('Email Verifcation Sent. Please Check Your Inbox.')
    } catch (error) {
      console.error(error)
      setMessage(error.message)
    }
  }

  return (
    <>
      <h4>Verify Email</h4>
      <h6>You have not verified your account. Resend Email Verification?</h6>
      {message ? (
        <>
          <h6 className="mt-4 mb-4">{message}</h6>
        </>
      ) : (
        <Button size="sm" className="mt-2 mb-4" onClick={sendEmail}>
          Resend Email
        </Button>
      )}
    </>
  )
}

export default VerifyEmail
