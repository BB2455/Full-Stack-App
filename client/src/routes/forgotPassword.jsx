import React, { useEffect, useState } from 'react'
import ForgotForm from '../components/ForgotPassword/ForgotForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate, Link } from 'react-router-dom'
import { getActiveProfile } from '../utils/getActiveProfile'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    if (getActiveProfile()) navigate('/', { replace: true })
  }, [navigate])
  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={4} md={6} sm={7}>
          <h1 className="mb-5">Forgot Password</h1>
          {emailSent ? (
            <>
              <h4>Email Sent.</h4>
              <h6>
                Please check your email to reset your password. Check your spam
                folder if you haven't received the email.
              </h6>
            </>
          ) : (
            <ForgotForm setEmailSent={setEmailSent} />
          )}
          <h6 className={emailSent ? 'mt-5' : 'mt-3'}>
            Already have a account? <Link to="/login">Sign In Here</Link>
          </h6>
          <h6 className="mt-3">
            Don't have an account? <Link to="/register">Register Here</Link>
          </h6>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPassword
